import SMERouter from 'sme-router'
import indexTpl from '../views/index.art'
import loginTpl from '../views/login.art'

const router = new SMERouter('root')
// template functions
const htmlIndex = indexTpl({})
const htmlLogin = loginTpl({})

router.route('/', (req, res, next) => {
    console.log(req.query);
    res.render(htmlIndex)
  })

router.route('/login', (req, res, next) => {
    res.render(htmlLogin)
  })

export default router