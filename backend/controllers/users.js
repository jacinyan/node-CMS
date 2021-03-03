// import User model from Model
const User = require('../model/user')
// 
const { hash } = require('../utils/tools')

const register = async (req, res, next) => {
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

        let result = await User.registerUser({
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
const list = async (req, res, next) => {
    res.set('content-type', 'application/json;charset=utf-8')

    const listResult = await User.findList()
    res.render('success', {
        data: JSON.stringify(listResult)
    })
}

// delete user
const remove = async (req, res, next) => {
    res.set('content-type', 'application/json;charset=utf-8')

    const { id } = req.body
    let result = await User.removeUser(id)
    console.log(result);
    if (result) {
        res.render('success', {
            data: JSON.stringify({
                message: 'User successfully deleted'
            })
        })
        return
    }
    res.render('fail', {
        data: JSON.stringify({
            message: 'User not deleted'
        })
    })
}


module.exports = {
    register,
    list,
    remove
}