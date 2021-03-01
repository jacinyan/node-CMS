const user = require('../model/user')

// user register middleware
const register = (req, res, next) => {
    const { username, password } = req.body
    // console.log(username, password);

    user.register({
        username,
        password
    })

    res.render('success', {
        data: JSON.stringify({
            username,
            password
        })
    })
}

exports.register = register