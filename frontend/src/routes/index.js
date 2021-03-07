import GP21Router from 'gp21-router'
// middleware from controllers
import index from '../components/index'
import listUsers from '../components/users/listUsers'
import listPositions from '../components/positions/listPositions'
import login from '../components/login'

import { auth } from '../services/auth'

const router = new GP21Router('root')

// route guard 
router.use(async (req) => {
    // first page direction
    let result = await auth()
    if (result.result) {
        router.go(req.url)
    } else {
        router.go('/login')
    }
})

// router.route('/', () => { })

router.route('/login', login(router))

router.route('/index', index(router))
router.route('/index/users', listUsers(router))
router.route('/index/positions', listPositions(router))

router.route('*', (req, res, next) => {
    res.redirect('/index/users')
})

export default router