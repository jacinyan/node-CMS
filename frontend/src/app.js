import indexTpl from './views/index.art'
import loginTpl from './views/login.art'

// template functions
const html = loginTpl({})

$('#root').html(html)