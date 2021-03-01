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

const login = (router) => {
    return (req, res, next) => {
        res.render(htmlLogin)

        // event binding
        $('#login').on('submit', _handleSubmit(router))
    }
}

const index = (router) => {
    return (req, res, next) => {
        res.render(htmlIndex)

        // trigger automatic content wrapper resizing
        $(window, '.wrapper').resize()

        // fill user list
        $('#content').html(usersTpl())
    }

}

export {
    login,
    index
}