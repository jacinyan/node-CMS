import SMERouter from 'sme-router'
// controllers
import { login, index } from '../controllers'

const router = new SMERouter('root')

router.route('/', login(router))

router.route('/index', index(router))

// router.route('/login', login(router))


export default router