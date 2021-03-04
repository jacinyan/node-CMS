import usersListNavTpl from '../views/users-list-nav.art'

// pagination bar
const pagination = (data, pageSize, currentPage) => {
    const total = data.length
    const pagesCount = Math.ceil(total / pageSize)
    const countArray = new Array(pagesCount)

    const htmlListNav = usersListNavTpl({
        countArray
    })

    $('#users-footer').html(htmlListNav)

    _setActivePage(currentPage)

    _bindEvents()
}

// set active page
const _setActivePage = (index) => {
    $('#users-footer #users-list-nav li:not(:first-child, :last-child)')
        .eq(index - 1)
        .addClass('active')
        .siblings()
        .removeClass('active')
}

const _bindEvents = () => {
    // page navigation callback
    $('#users-footer').on('click', '#users-list-nav li:not(:first-child, :last-child)', function () {
        const index = $(this).index()

        $('body').trigger('changeCurrentPage', index)
        _setActivePage(index)
    })

    // toggle with greater/less than in sync with active pages
    $('#users-footer').on('click', '#users-list-nav li:first-child', function () {
        if (currentPage > 1) {
            currentPage--
            _list(currentPage)
            _setActivePage(currentPage)
        }
    })

    $('#users-footer').on('click', '#users-list-nav li:last-child', function () {
        if (currentPage < Math.ceil(sourceUsers.length / pageSize)) {
            currentPage++
            _list(currentPage)
            _setActivePage(currentPage)
        }
    })
}

export default pagination