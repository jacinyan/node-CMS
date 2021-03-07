import indexTpl from '../templates/index.art'
import { auth } from '../services/auth'
import pageHeader from '../helper/pageheader'

import page from '../helper/page'

import img from '../assets/user2-160x160.jpg'

const index = (router) => {
    return async (req, res, next) => {
        let result = await auth()
        if (result.result) {
            const html = indexTpl({
                subRoute: res.subRoute(),
                img
            })

            // render Index 
            next(html)

            // trigger automatic content wrapper resizing
            $(window, '.wrapper').resize()

            // load pageheader
            pageHeader()

            const $as = $('#sidebar-menu li:not(:first-child) a')
            let hash = location.hash
            $as
                .filter(`[href="${hash}"]`)
                .parent()
                .addClass('active')
                .siblings()
                .removeClass('active')

            // whether to reset page 
            if (hash !== page.currentRoute) {
                page.reset()
            }

            // save current url
            page.setCurrentRoute(hash)

            // user sign out binding 
            $('#users-sign-out').on('click', (e) => {
                e.preventDefault()
                localStorage.removeItem('crm-token')
                location.reload()
            })

        } else {
            router.go('/login')
        }
    }
}

export default index