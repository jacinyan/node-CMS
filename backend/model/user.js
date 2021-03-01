// import usersModel from database(exports.User = usersModel)
const { User } = require('../utils/db')

// query if there's an existing user
const findUser = (username) => {
    // console.log(User.findOne({ username }))  ==> Promise
    return User.findOne({ username })
}

// register new user
const register = ({ username, password }) => {
    const user = new User({
        username,
        password
    })
    return user.save()
}

module.exports = {
    findUser,
    register
}