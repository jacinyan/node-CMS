import SMERouter from 'sme-router'
// middleware from controllers
import { login, index } from '../controllers'

const router = new SMERouter('root')

router.route('/login', login(router))

router.route('/index', index(router))

export default router