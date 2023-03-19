const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcrypt')

loginRouter.post('/', async (req, res, next) => {
    try{
        const {username, password} = req.body

        const user = await User.findOne({username})
        const passwordCheck = user === null ? false : await bcrypt.compare(password, user.passwordHash)


        if(!user && !passwordCheck){
            return res.status(401).json({error: 'Username or password invalid'})
        }

        const userToken = {
            username: user.username,
            id: user._id
        }

        const token = jwt.sign(userToken, process.env.SECRET,{expiresIn: 60*60})

        res.status(200).json({token, username: user.username, name:user.name})
    }catch(err) {
        next(err)
    }
})


module.exports = loginRouter