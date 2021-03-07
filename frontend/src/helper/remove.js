import * as itemsRemove from '../services/remove'
import page from './page'

const remove = ({
    $box,
    url,
    loadData,
    state
}) => {
    // bind remove events to list containers
    $box.off('click').on('click', '.remove', async function () {
        length = state.source.length
        let result = await itemsRemove.remove({
            url,
            id: $(this).data('id')
        })

        if (result.result) {
            loadData()
            
            // determine if the current page is empty and if so eliminate current page
            const isLastPage = Math.ceil(length / page.pageSize) === page.currentPage
            const restOne = length % page.pageSize === 1
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