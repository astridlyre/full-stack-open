const logger = require('./logger')

const tokenExtractor = (req, res, next) => {
  const auth = req.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    req.token = auth.substring(7)
    next()
  } else {
    req.token = null
    next()
  }
}

const requestLogger = (req, res, next) => {
  logger.info('Method: ', req.method)
  logger.info('Path: ', req.path)
  logger.info('Body: ', req.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown Endpoint' })
}

const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError')
    return res.status(400).send({ error: 'Invalid ID' })
  if (error.name === 'ValidationError')
    return res.status(400).json({ error: error.message })
  if (error.name === 'JsonWebTokenError')
    return res.status(401).json({ error: 'Invalid Token' })

  logger.error(error.message)
  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
}
