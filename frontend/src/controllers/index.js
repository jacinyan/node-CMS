import indexTpl from '../views/index.art'
import loginTpl from '../views/login.art'
import usersTpl from '../views/users.art'
import usersListTpl from '../views/users-list.art'
import usersListNavTpl from '../views/users-list-nav.art'

// fetch views templates
const htmlIndex = indexTpl({})
const htmlLogin = loginTpl({})

// global vars/const for users list rendering and pagination
const pageSize = 10
let sourceUsers = []

// ----business logic begins------
const login = (router) => {
    return (req, res, next) => {
        res.render(htmlLogin)

        $('#login').on('submit', _handleSubmit(router))
    }
}

const index = (router) => {
    return (req, res, next) => {
        // render home
        res.render(htmlIndex)

        // trigger automatic content wrapper resizing
        $(window, '.wrapper').resize()

        // fill content with users list
        $('#content').html(usersTpl())
        // bind remove event to list container instead of the button(event delegate/bubbling)
        $('#users-list').on('click', '.remove', function () {
            $.ajax({
                url: '/api/users',
                type: 'delete',
                data: {
                    // get dom named: data-id
                    id: $(this).data('id')
                },
                success(){
                    _getUsersData()
                }
            })
        })

        // users list initial rendering
        _getUsersData()

        // _register callback onclick
        $('#users-save').on('click', _register)

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
            _list(1)
        }
    })
}

// users list rendering by page indices
const _list = (pageNum) => {
    let start = (pageNum - 1) * pageSize
    $('#users-list').html(usersListTpl({
        data: sourceUsers.slice(start, start + pageSize)
    }))


}

// pagination
const _pagination = (data) => {
    const total = data.length
    const pagesCount = Math.ceil(total / pageSize)
    const countArray = new Array(pagesCount)

    const htmlListNav = usersListNavTpl({
        countArray
    })

    $('#users-footer').html(htmlListNav)

    // first page active by default
    $('#users-list-nav li:nth-child(2)').addClass('active')
    // page navigation callback
    $('#users-list-nav li:not(:first-child, :last-child)').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active')
        _list($(this).index())
    })
}

const _handleSubmit = (router) => {
    return (e) => {
        e.preventDefault()
        router.go('/index')
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

            // render first page with newly reg'ed user
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