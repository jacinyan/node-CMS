import SMERouter from 'sme-router'
// middleware from controllers
import { login, index } from '../controllers'

const router = new SMERouter('root')

// route guard
router.use(() => {
    // 
    $.ajax({
        url: '/api/users/isAuth',
        dataType: 'json',
        success(result) {
            if (result.result) {
                router.go('/index')
            } else {
                console.log(result.result);
                router.go('/login')
            }
        }
    })
})

router.route('/', () => {
  
})

router.route('/login', login(router))

router.route('/index', index(router))

export default router