// import User model
const User = require('../model/user')

// user register middleware
const _register = async (req, res, next) => {
    const { username, password } = req.body
    // console.log(username, password);

    // check if a user exists
    let findResult = await User.findUser(username)
    // console.log(findResult);

    // response to the result
    if (findResult) {
        res.render('fail', {
            data: JSON.stringify({
                message: 'Username exists'
            })
        })
    } else {
        
        let result = await User.register({
            username,
            password
        })

        console.log(result);

        res.render('success', {
            data: JSON.stringify({
                username,
                password
            })
        })
    }

}

exports.register = _register