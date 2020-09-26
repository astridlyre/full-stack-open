const { ApolloServer } = require('apollo-server')
const jwt = require('jsonwebtoken')
const User = require('./models/user')
const mongoose = require('mongoose')
const typeDefs = require('./typedefs/index')
const resolvers = require('./resolvers/index')
const { MONGODB_URI, SECRET } = require('./utils/config')

// start up
console.log('connecting to ', MONGODB_URI)

// conect to database
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('connected to MongoDB'))
  .catch(e => console.log('error connecting to MogoDB: ', e.message))

// start server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer')) {
      const decodedToken = jwt.verify(auth.substring(7), SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
