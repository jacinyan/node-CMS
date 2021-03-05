import loginTpl from '../views/login.art'

const htmlLogin = loginTpl({})

const login = (router) => {
    console.log('frontend-routes-login 6.js');
    return (req, res, next) => {
        res.render(htmlLogin)
        console.log('frontend-routes-login 8.js');
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
            success: (result, textStatus, jqXHR) => {
                const token = jqXHR.getResponseHeader('X-Access-Token')
                localStorage.setItem('crm-token', token)
                if (result.result){
                    console.log('frontend-controllers-login --- 26.js')

                    router.go('/index')
                }
            }
        })
    }
}

export default login