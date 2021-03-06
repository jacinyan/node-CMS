import {auth} from '../../services/auth'

const listPositions = (router) => {
    return async(req,res,next)=>{
      let result = await auth()
      if (result.result){
        next()
        res.render('positions.')
      } else {
        router.go('/login')
      }
    }
}

export default listPositions