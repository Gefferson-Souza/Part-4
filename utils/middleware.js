const morgan = require("morgan");
const logger = require("./logger");
const jwt = require("jsonwebtoken");
const User = require('../models/user')

morgan.token("object", (req, res) => {
  JSON.stringify(req.body);
});

const morganLogger = morgan(
  ":method :url :status :res[content-length] - :response-time ms :object"
);

const unknownEndpoint = (req, res, next) => {
  res.status(404).json({ error: "Unkown EndingPoint" });
  next()
};

const errorHandler = (err, req, res, next) => {
  logger.error(err);

  const errorStatus = err.status || 400;
  
  res.status(errorStatus).json({ error: err.message });

  next(err);
};

const tokenExtractor = (req, res, next) => {
  try{
      const authorization = req.get('authorization')
      if(authorization && authorization.startsWith('Bearer ', '')){
        const token = authorization.replace('Bearer ','')
        req.token = token
      }else {
        req.token = null
      }
      next()
  }catch(err){
    next(err)
  }
}

const userExtractor = async (req, res, next) => {
  try{
      const decodedToken = jwt.verify(req.token, process.env.SECRET)

      if(!decodedToken.id){
        res.status(401).json({error: 'Invalid token'})
      }

      const user = await User.findById(decodedToken.id)
      
      user ? req.user = user : req.user = null;
      next()
  }catch(err){
    next(err)
  }
}

module.exports = {
  morganLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
};
