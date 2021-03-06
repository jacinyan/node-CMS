import indexTpl from '../templates/index.art'
import { auth } from '../services/auth'

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


            // $lis.on('click', function () {
            //     const url = $(this).attr('to')
            //     router.go(url)
            // })

            const $as = $('#sidebar-menu li:not(:first-child) a')
            let hash = location.hash
            $as
                .filter(`[href="${hash}"]`)
                .parent()
                .addClass()
                .siblings()
                .removeClass('active')
        } else {
            router.go('/login')
        }
    }
}

export default index