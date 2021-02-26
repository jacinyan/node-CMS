import indexTpl from '../views/index.art'
import loginTpl from '../views/login.art'

// template functions
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
    }
}

export {
    login,
    index
}