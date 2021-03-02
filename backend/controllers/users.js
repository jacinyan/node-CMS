// import User model from Model
const User = require('../model/user')
// 
const { hash } = require('../utils/tools')

const _register = async (req, res, next) => {
    const { username, password } = req.body
    // console.log(username, password);
    // set res headers
    res.set('content-type', 'application/json;charset=utf-8')

    // encrypt passwords
    const bcryptPassword = await hash(password)

    // check if a user exists
    let findResult = await User.findUser(username)
    // console.log(findResult); => {userObj} || null

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
            password: bcryptPassword
        })

        // register prompt
        console.log(`User ${result.username} is registered`);

        res.render('success', {
            data: JSON.stringify({
                message: 'Successfully registered'
            })
        })
    }

}

// get users list
const _list = async (req, res, next) => {
    res.set('content-type', 'application/json;charset=utf-8')

    const list = await User.findList()
    res.render('success', {
        data: JSON.stringify(list)
    })
}

module.exports = {
    register: _register,
    list: _list
}