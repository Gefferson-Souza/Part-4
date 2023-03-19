const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: [true, "username is required"], minLength: [3, "username must be at least 3 characters"]},
    name: {type: String, unique: true, required: [true, "name is required"]},
    passwordHash: String,
    blogs: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BlogModel'
    }
]
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject.passwordHash
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = mongoose.model('User', userSchema)