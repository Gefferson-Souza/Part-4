const User = require('../models/user')

const usersInDb = async () => {
    const result = await User.find({})
    return result.map(user => user.toJSON())
}

module.exports = usersInDb