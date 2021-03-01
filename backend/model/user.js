const { User } = require('../utils/db')

const register = ({ username, password }) => {
    const user = new User({
        username,
        password
    })
    user.save()
}

exports.register = register