const express = require('express')
const app = express()
const cors = require('cors')
const config = require('./utils/config')
const blogRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

const middleware = require('./utils/middleware')
const loginRouter = require('./controllers/login')

mongoose.set('strictQuery', false)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('Connected to MongoDB')
    })
    .catch(error => {
        logger.error('Error: ', error.message)
    })

app.use(cors())
app.use(express.json())
app.use(middleware.morganLogger)
app.use(middleware.tokenExtractor)
app.use('/api/blogs',blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app