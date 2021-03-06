import loginTpl from '../templates/login.art'
import { login as loginService } from "../services/login";

const htmlLogin = loginTpl({})

const login = (router) => {
    return (req, res, next) => {
        res.render(htmlLogin)
        console.log('frontend-routes-login 8.js');
        $('#login').on('submit', _handleSubmit(router))
    }
}

const _handleSubmit = (router) => {
    return async(e) => {
        e.preventDefault()
        const data = $('#login').serialize()
        let {jqXHR, result} =  await loginService(data)
        const token = jqXHR.getResponseHeader('X-Access-Token')
            localStorage.setItem('crm-token', token)
            if (result.result){
                console.log('frontend-controllers-login --- 26.js')

                router.go('/index')
            }
    }
}

export default login