import indexTpl from '../views/index.art'
import loginTpl from '../views/login.art'
import usersTpl from '../views/users.art'
import usersListTpl from '../views/users-list.art'
import usersListNavTpl from '../views/users-list-nav.art'
// import router 
import router from '../routes/index'

// fetch views templates
const htmlIndex = indexTpl({})
const htmlLogin = loginTpl({})

// global vars/const for users list rendering and pagination
const pageSize = 10
let sourceUsers = []
let currentPage = 1

// ----business logic begins------
const login = (router) => {
    return (req, res, next) => {
        res.render(htmlLogin)

        $('#login').on('submit', _handleSubmit(router))
    }
}

const index = (router) => {

    const loadIndex = (res) => {
        // render home/admin dashboard
        res.render(htmlIndex)

        // trigger automatic content wrapper resizing
        $(window, '.wrapper').resize()

        // fill content with users list
        $('#content').html(usersTpl())

        // bind remove user event to list container instead of the button(event delegate/bubbling)
        $('#users-list').on('click', '.remove', function () {
            $.ajax({
                url: '/api/users',
                type: 'delete',
                data: {
                    // get dom named 'data-id', and then its value from backend 
                    id: $(this).data('id')
                },
                success() {
                    _getUsersData()

                    // determine if the current page is empty and if so elimnate curretn page
                    const isLastPage = Math.ceil(sourceUsers.length / pageSize) === currentPage
                    const restOne = sourceUsers.length % pageSize === 1
                    const notFirstPage = currentPage > 0
                    if (isLastPage && restOne && notFirstPage) {
                        currentPage--
                    }

                }
            })
        })

        // page navigation callback
        $('#users-footer').on('click', '#users-list-nav li:not(:first-child, :last-child)', function () {
            const index = $(this).index()
            // calculating the num of pages
            _list(index)
            // set active page
            currentPage = index
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

        // user sign out binding 
        $('#users-sign-out').on('click', (e) => {
            e.preventDefault()
            $.ajax({
                url: '/api/users/logout',
                dataType: 'json',
                success(result) {
                    if (result.result) {
                        location.reload()
                    }
                }
            })
        })

        // users list initial rendering
        _getUsersData()

        // _register callback onclick with popup modal
        $('#users-save').on('click', _register)
    }

    return (req, res, next) => {
        $.ajax({
            url: '/api/users/isAuth',
            dataType: 'json',
            async: false,
            success(result) {
                if (result.result) {
                    loadIndex(res)                    
                } else {
                    router.go('/login')
                }
            }
        })

    }
}

// -----private functions--------
// fetch users data
const _getUsersData = () => {
    $.ajax({
        url: '/api/users',
        // async: false,
        success(result) {
            sourceUsers = result.data

            // pagination once only with each data fetching
            _pagination(result.data)
            // data rendering when login and new registered user
            _list(currentPage)
        }
    })
}

// calculate pages num with each operation
const _list = (pageNum) => {
    let start = (pageNum - 1) * pageSize
    $('#users-list').html(usersListTpl({
        data: sourceUsers.slice(start, start + pageSize)
    }))


}

// pagination bar
const _pagination = (data) => {
    const total = data.length
    const pagesCount = Math.ceil(total / pageSize)
    const countArray = new Array(pagesCount)

    const htmlListNav = usersListNavTpl({
        countArray
    })

    $('#users-footer').html(htmlListNav)

    _setActivePage(currentPage)
}

// set active page
const _setActivePage = (index) => {
    $('#users-footer #users-list-nav li:not(:first-child, :last-child)')
        .eq(index - 1)
        .addClass('active')
        .siblings()
        .removeClass('active')
}

const _handleSubmit = (router) => {
    return (e) => {
        e.preventDefault()
        const data = $('#login').serialize()
        $.ajax({
            url: '/api/users/login',
            type: 'POST',
            dataType: 'json',
            data,
            success: (result) => {
                if (result.result)
                    router.go('/index')
            }
        })
    }
}

// similar logic to registering new users
const _register = () => {
    const $btn_close = $('#users-close')

    // collect form data
    const data = $('#users-form').serialize()
    $.ajax({
        url: '/api/users',
        type: 'POST',
        data,
        success: (result) => {
            console.log(result);

            // render first page with newly registered user
            _getUsersData()
        }
    })

    // trigger close event
    $btn_close.click()
}

export {
    login,
    index
}