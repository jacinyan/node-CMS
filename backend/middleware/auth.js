const auth = (req,res,next) => {
  if (req.session.username){
    next()
  } else {
    res.render('fail', {
        data: JSON.stringify({
            message: 'Login expired. Please log in again.'
        })
    })
  }
}

exports.auth = auth