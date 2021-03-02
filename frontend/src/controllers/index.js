import indexTpl from '../views/index.art'
import loginTpl from '../views/login.art'
import usersTpl from '../views/users.art'
import usersListTpl from '../views/users-list.art'
import usersListNavTpl from '../views/users-list-nav.art'

// template functions that return a template instance
const htmlIndex = indexTpl({})
const htmlLogin = loginTpl({})

// global vars/const for users list display
const pageSize = 10
let sourceUsers = []

const _handleSubmit = (router) => {
    return (e) => {
        e.preventDefault()
        router.go('/index')
    }
}

// note: similar logic as registering new users
const _register = () => {
    const $btn_close = $('#users-close')

    // collect form data
    const data = $('#users-form').serialize()
    $.ajax({
        url: '/api/users/register',
        type: 'POST',
        data,
        success(result) {
            console.log(result);

            // redirect to first page with newly reg'ed user
            _getUsersData()
            _list()
        }
    })

    // trigger close event
    $btn_close.click()
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

    // first page selected by default
    $('#users-list-nav li:nth-child(2)').addClass('active')
    $('#users-list-nav li:not(:first-child, :last-child)').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active')
        _list($(this).index())
    })
}

const _getUsersData = () => {
    $.ajax({
        url: '/api/users/list',
        async: false,
        success(result) {
            sourceUsers = result.data

            // start paginating
            _pagination(result.data)
        }
    })
}

// get users list
const _list = (pageNum) => {
    let start = (pageNum - 1) * pageSize
    // render users list
    $('#users-list').html(usersListTpl({
        data: sourceUsers.slice(start, start + pageSize)
    }))
}

const login = (router) => {
    return (req, res, next) => {
        res.render(htmlLogin)

        // event binding
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

        // initial list rendering
        _getUsersData()
        _list(1)

        // _register callback onclick
        $('#users-save').on('click', _register)

    }
}

export {
    login,
    index
}