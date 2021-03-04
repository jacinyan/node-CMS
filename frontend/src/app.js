// import routes
import router from './routes'
// import css
import './assets/common.css'

// 
$.ajax({
    url: '/api/users/isAuth',
    dataType: 'json',
    success(result){
        if(result.result){
            router.go('/index')
        }  else {
            console.log(result.result);
            router.go('/login')
        }
    }
})





