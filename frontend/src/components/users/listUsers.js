import usersTpl from '../../templates/users.art'

import usersListTpl from '../../templates/users-list.art'

import pagination from '../../helper/pagination'
import page from '../../helper/page'

import { addUser } from './addUser'

import { usersList } from '../../services/users-list'
import { auth } from '../../services/auth'

import { remove } from '../../helper/remove'

const pageSize = page.pageSize

let state = {
    source: []
}

const listUsers = (router) => {
    return async (req, res, next) => {
        let result = await auth()
        if (result.result) {
            next()
            res.render(usersTpl({}))

            $('#add-user-btn').on('click', addUser)

            // fetch users data
            await _loadData()

            // index page events binding methods
            remove({
                $box: $('#users-list'),
                state,
                url: '/api/users',
                loadData: _loadData
            })

            // events subscription
            _subscribe()
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
    state.source = result.data
    // pagination once only with each data fetching
    pagination(result.data)
    // data rendering when login and new registered user
    _list(page.currentPage)
}

// calculate pages index with each operation
const _list = (pageNum) => {
    let start = (pageNum - 1) * pageSize
    $('#users-list').html(usersListTpl({
        data: state.source.slice(start, start + pageSize)
    }))
}

export default listUsers