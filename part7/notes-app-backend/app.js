const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const notesRouter = require('./routes/notes')
const commentsRouter = require('./routes/comments')
const usersRouter = require('./routes/users')
const loginRouter = require('./routes/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to ', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info('connected to database')
  })
  .catch(e => {
    logger.error('error connecting to database: ', e.message)
  })

app.use(cors())
app.use(express.json())
app.use('/topsecret', express.static('topsecret'))
app.use(middleware.tokenExtractor)
app.use(middleware.requestLogger)

app.use('/api/login', loginRouter)
app.use('/api/notes', notesRouter)
app.use('/api/comments', commentsRouter)
app.use('/api/users', usersRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./routes/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
