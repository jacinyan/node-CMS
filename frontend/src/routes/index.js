import SMERouter from 'sme-router'
// middleware from controllers
import index from '../controllers/users/index'
import login from '../controllers/login'

const router = new SMERouter('root')
console.log('frontend-routes-index 7.js');
// route guard -- routing front gate
router.use(() => {
    // auth 
    $.ajax({
        url: '/api/users/isAuth',
        dataType: 'json',
        headers:{
            'X-Access-Token': localStorage.getItem('crm-token') || ''
        },
        success(result) {
            if (result.result) {
                console.log('frontend-routes-index 19.js')

                router.go('/index')
            } else {
                console.log('frontend-routes-index 23.js')
                router.go('/login')
            }
        }
    })
})

router.route('/', () => { })

router.route('/login', login(router))

router.route('/index', index(router))

export default router