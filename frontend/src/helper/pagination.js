import usersListNavTpl from '../templates/users-list-nav.art'
// global page instance
import page from './page'

// pagination bar
const pagination = (data, pageSize) => {
    const total = data.length
    const pagesCount = Math.ceil(total / pageSize)
    const countArray = new Array(pagesCount)

    const htmlListNav = usersListNavTpl({
        countArray
    })

    $('#users-footer').html(htmlListNav)

    _setActivePage(page.currentPage)

    _bindEvents(data, pageSize)
}

// set active page
const _setActivePage = (index) => {
    $('#users-footer #users-list-nav li:not(:first-child, :last-child)')
        .eq(index - 1)
        .addClass('active')
        .siblings()
        .removeClass('active')
}

const _bindEvents = (data, pageSize) => {
    // page navigation callback
    $('#users-footer').on('click', '#users-list-nav li:not(:first-child, :last-child)', function () {
        const index = $(this).index()

        page.setCurrentPage(index)

        $('body').trigger('changeCurrentPage', index)
        _setActivePage(index)
    })

    // toggle with greater/less than in sync with active pages
    $('#users-footer').on('click', '#users-list-nav li:first-child', function () {
        if (page.currentPage > 1) {
            page.setCurrentPage(page.currentPage - 1)
            
            $('body').trigger('changeCurrentPage', page.currentPage)
            console.log('left');
            _setActivePage(page.currentPage)
        }
    })

    $('#users-footer').on('click', '#users-list-nav li:last-child', function () {
        console.log(page.currentPage);
        if (page.currentPage < Math.ceil(data.length / pageSize)) {
            page.setCurrentPage(page.currentPage + 1)
            $('body').trigger('changeCurrentPage', page.currentPage)
            console.log('right');
            _setActivePage(page.currentPage)
        }
    })
}

export default pagination