import indexTpl from '../views/index.art'
import loginTpl from '../views/login.art'
import usersTpl from '../views/users.art'
import usersListTpl from '../views/users-list.art'

// template functions that return a template instance
const htmlIndex = indexTpl({})
const htmlLogin = loginTpl({})

const _handleSubmit = (router) => {
    return (e) => {
        e.preventDefault()
        router.go('/index')
    }
}

const _register = () => {
    const $btn_close = $('#users-close')

    // collect form data
    const data = $('#users-form').serialize()
    $.ajax({
        url: '/api/users/register',
        type: 'POST',
        data,
        success(res){
            console.log(res);
        }
    })
    // trigger close event
    $btn_close.click()
}

const _list = () => {
  $.ajax({
      url: '/api/users/list',
      success(res){
        // render users list
        $('#users-list').html(usersListTpl({
            data: res.data
        }))
      }
  })
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

        // execute _list
        _list()

        // _register callback onclick
        $('#users-save').on('click', _register)

    }

}

export {
    login,
    index
}