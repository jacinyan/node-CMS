import * as itemsRemove from '../services/remove'
import page from './page'

const remove = ({
    $box,
    url,
    loadData,
    dataSource
}) => {
    // bind remove events to list containers
    $box.off('click').on('click', '.remove', async function () {
        let result = await itemsRemove.remove({
            url,
            id: $(this).data('id')
        })

        if (result.result) {
            loadData()

            // determine if the current page is empty and if so elimnate curretn page
            const isLastPage = Math.ceil(dataSource.length / page.pageSize) === page.currentPage
            const restOne = dataSource.length % page.pageSize === 1
            const notFirstPage = page.currentPage > 0
            if (isLastPage && restOne && notFirstPage) {
                page.setCurrentPage(page.currentPage - 1)
            }
        }
    })
}

export {
    remove
} 