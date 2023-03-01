const express = require('express')
const app = express()

const cors = require('cors')
const config = require('./utils/config')
const blogRouter = require('./controllers/blogController')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

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
app.use('/api/notes', blogRouter)