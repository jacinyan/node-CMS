import indexTpl from '../views/index.art'
import loginTpl from '../views/login.art'
import usersTpl from '../views/users.art'

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

    $btn_close.click()
}

const login = (router) => {
    return (req, res, next) => {
        res.render(htmlLogin)

        // event binding
        $('#login').on('submit', _handleSubmit(router))
    }
}

const register = () => {

}

const index = (router) => {
    return (req, res, next) => {
        res.render(htmlIndex)

        // trigger automatic content wrapper resizing
        $(window, '.wrapper').resize()

        // fill content with users list
        $('#content').html(usersTpl())

        // _register callback onclick
        $('#users-save').on('click', _register)
    }

}

export {
    login,
    register,
    index
}