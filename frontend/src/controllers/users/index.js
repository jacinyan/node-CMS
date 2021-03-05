import indexTpl from '../../views/index.art'

import usersTpl from '../../views/users.art'
import usersListTpl from '../../views/users-list.art'

import pagination from '../../components/pagination'
import page from '../../helper/page'

import { addUser } from '../../controllers/users/addUser'

const pageSize = page.pageSize

// fetch views templates
const htmlIndex = indexTpl({})

let sourceUsers = []

const index = (router) => {
    const loadIndex = (res) => {
        // render home/admin dashboard
        res.render(htmlIndex)

        // trigger automatic content wrapper resizing
        $(window, '.wrapper').resize()

        // fill content with users list at initial rendering
        $('#content').html(usersTpl())
        $('#add-user-btn').on('click', addUser)

        _getUsers()

        // index page events binding methods
        _methods()

        // events subscription
        _subscribe()
    }

    return (req, res, next) => {
        $.ajax({
            url: '/api/users/isAuth',
            dataType: 'json',
            headers: {
                'X-Access-Token': localStorage.getItem('crm-token') || ''
            },
            success(result) {
                if (result.result) {
                    loadIndex(res)
                } else {
                    console.log('controllers index --- 44.js')
                    router.go('/login')
                }
            }
        })

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
    $('#users-list').on('click', '.remove', function () {
        $.ajax({
            url: '/api/users',
            type: 'delete',
            headers: {
                'X-Access-Token': localStorage.getItem('crm-token') || ''
            },
            data: {
                // get dom named 'data-id', and then its value from backend 
                id: $(this).data('id')
            },
            success() {
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
    })

    // user sign out binding 
    $('#users-sign-out').on('click', (e) => {
        e.preventDefault()
        localStorage.removeItem('crm-token')
        location.reload()
        
    })
}


// fetch users data
const _getUsers = () => {
    $.ajax({
        url: '/api/users',
        headers: {
            'X-Access-Token': localStorage.getItem('crm-token') || ''
        },
        success(result) {
            sourceUsers = result.data

            // pagination once only with each data fetching
            pagination(result.data, pageSize)
            // data rendering when login and new registered user
            _list(page.currentPage)
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




export default index