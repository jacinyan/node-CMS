import SMERouter from 'sme-router'
// middleware from controllers
import index from '../controllers/users/index'
import login from '../controllers/login'

import { routeGuard } from '../helper/route-guard'

const router = new SMERouter('root')
console.log('frontend-routes-index 7.js');

// route guard 
router.use(async () => {
    let result = await routeGuard()
    if (result.result) {
        console.log('frontend-routes-index 19.js')

        router.go('/index')
    } else {
        console.log('frontend-routes-index 23.js')
        router.go('/login')
    }
})

router.route('/', () => { })

router.route('/login', login(router))

router.route('/index', index(router))

export default router