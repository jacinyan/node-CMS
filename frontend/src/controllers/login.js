import loginTpl from '../views/login.art'

const htmlLogin = loginTpl({})

const login = (router) => {
    return (req, res, next) => {
        res.render(htmlLogin)

        $('#login').on('submit', _handleSubmit(router))
    }
}

const _handleSubmit = (router) => {
    return (e) => {
        e.preventDefault()
        const data = $('#login').serialize()
        $.ajax({
            url: '/api/users/login',
            type: 'POST',
            dataType: 'json',
            data,
            success: (result) => {
                if (result.result)
                    router.go('/index')
            }
        })
    }
}

export default login