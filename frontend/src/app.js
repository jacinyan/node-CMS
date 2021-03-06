// import css
import './assets/common.css'
// import routes
import router from './routes'

const hash = location.hash.slice(1)

router.go(hash)





