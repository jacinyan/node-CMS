// user register
const register = (req, res, next) => {
    res.render('success', {
        data: JSON.stringify({x:0})
    })
}

exports.register = register