import usersTpl from '../../templates/users.art'

import usersListTpl from '../../templates/users-list.art'

import pagination from '../../helper/pagination'
import page from '../../helper/page'

import { addUser } from './addUser'

import { usersList } from '../../services/users-list'
import { auth } from '../../services/auth'
import { usersRemove } from '../../services/users-remove'

const pageSize = page.pageSize


let sourceUsers = []

const index = (router) => {
    const loadIndex = (res, next) => {
        // fill content with users list at initial rendering
        // $('#content').html(usersTpl())
        next()
        res.render(usersTpl({}))

        $('#add-user-btn').on('click', addUser)

        // fetch users data
        _getUsers()

        // index page events binding methods
        _methods()

        // events subscription
        _subscribe()
    }

    return async (req, res, next) => {
        let result = await auth()
        if (result.result) {
            loadIndex(res, next)
        } else {
            router.go('/login')
        }
    }
}

// PubSub
const _subscribe = () => {
    $('body').on('changeCurrentPage', (e, index) => {
        _list(index);
        // console.log(page.currentPage);
    })
    $('body').on('addUser', (e) => {
        _getUsers()
    })
}

// methods
const _methods = () => {
    // bind remove user event to list container instead of the button(event delegate/bubbling)
    $('#users-list').off('click').on('click', '.remove', async function () {
        let result = await usersRemove($(this).data('id'))
        if (result.result) {
            _getUsers()

            // determine if the current page is empty and if so elimnate curretn page
            const isLastPage = Math.ceil(sourceUsers.length / pageSize) === page.currentPage
            const restOne = sourceUsers.length % pageSize === 1
            const notFirstPage = page.currentPage > 0
            if (isLastPage && restOne && notFirstPage) {
                page.setCurrentPage(page.currentPage - 1)
            }
        }
    })

    // user sign out binding 
    $('#users-sign-out').on('click', (e) => {
        e.preventDefault()
        localStorage.removeItem('crm-token')
        location.reload()

    })
}


// fetch users data
const _getUsers = async () => {
    let result = await usersList()
    sourceUsers = result.data

    // pagination once only with each data fetching
    pagination(result.data, pageSize)
    // data rendering when login and new registered user
    _list(page.currentPage)
}

// calculate pages num with each operation
const _list = (pageNum) => {
    let start = (pageNum - 1) * pageSize
    $('#users-list').html(usersListTpl({
        data: sourceUsers.slice(start, start + pageSize)
    }))
}

export default index