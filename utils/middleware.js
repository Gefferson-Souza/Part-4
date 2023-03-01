const morgan = require('morgan')
const logger = require('./logger')

morgan.token('object', (req, res) => {
    JSON.stringify(req.body)
})

const morganLogger = morgan(':method :url :status :res[content-length] - :response-time ms :object')

const unknownEndpoint = (req, res) => {
    res.status(404).json({error: 'Unkown EndingPoint'})
}

const errorHandler = (err, req, res, next) => {
    logger.error(err.message)

    const errorStatus = err.status || 400

    res.status(errorStatus).json({error: err.message})

    next(err)

}

module.exports = {
    morganLogger,
    unknownEndpoint,
    errorHandler
}