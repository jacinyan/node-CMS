import usersTpl from '../../templates/users.art'

import usersListTpl from '../../templates/users-list.art'

import pagination from '../../helper/pagination'
import page from '../../helper/page'

import { addUser } from './addUser'

import { usersList } from '../../services/users-list'
import { auth } from '../../services/auth'

import {remove} from '../../helper/remove'

const pageSize = page.pageSize

let dataSource = []

const listUsers = (router) => {
    const loadIndex = (res, next) => {
        // fill content with users list at initial rendering
        // $('#content').html(usersTpl())
        next()
        res.render(usersTpl({}))

        $('#add-user-btn').on('click', addUser)

        // fetch users data
        _loadData()

        // index page events binding methods
        remove({
            $box:$('#users-list'),
            dataSource,
            url:'/api/users',
            loadData: _loadData
        })

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
        _loadData()
    })
}


// fetch users data
const _loadData = async () => {
    let result = await usersList()

    dataSource = result.data
    // pagination once only with each data fetching
    pagination(result.data)
    // data rendering when login and new registered user
    _list(page.currentPage)
}

// calculate pages num with each operation
const _list = (pageNum) => {
    let start = (pageNum - 1) * pageSize
    $('#users-list').html(usersListTpl({
        data: dataSource.slice(start, start + pageSize)
    }))
}

export default listUsers