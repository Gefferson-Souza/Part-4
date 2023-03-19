const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/', async (req, res, next) => {
    try{
        const users = await User.find({}).populate('blogs',{author:1, title: 1, likes: 1, url: 1})
        res.status(200).json(users)
    }catch(err){
        next(err)
    }
})


usersRouter.post('/', async (req, res) => {
    try{
        const {username, name, password} = req.body

        if(!password){
            return res.status(400).json({error: "Password is required"})
        }else if(password.length < 3) {
            return res.status(400).json({error: "Password must be at least 3 characters"})
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = new User ({
            username,
            name,
            passwordHash,
        })

        const savedUser = await user.save()
        res.status(201).send(savedUser)

    }catch (err){
        if(err.name === "ValidationError"){
            const message = Object.values(err.errors).map(value => value.message)
            return res.status(400).json({error: message})
        }
        next(err)
    }
})

module.exports = usersRouter

