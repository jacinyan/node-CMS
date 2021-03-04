import SMERouter from 'sme-router'
// middleware from controllers
import index from '../controllers/index'
import login from '../controllers/login'

const router = new SMERouter('root')

// route guard -- routing front gate
router.use(() => {
    // auth 
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

router.route('/', () => { })

router.route('/login', login(router))

router.route('/index', index(router))

export default router