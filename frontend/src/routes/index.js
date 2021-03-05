import SMERouter from 'sme-router'
// middleware from controllers
import index from '../components/users/index'
import login from '../components/login'

import { auth } from '../services/auth'

const router = new SMERouter('root')
console.log('frontend-routes-index 7.js');

// route guard 
router.use(async () => {
    let result = await auth()
    console.log(result);
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