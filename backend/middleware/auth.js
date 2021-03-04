const auth = (req,res,next) => {
  if (req.session.username){
    next()
  } else {
    res.render('fail', {
        data: JSON.stringify({
            message: 'Please log in'
        })
    })
  }
}

exports.auth = auth