require('dotenv').config()

let MONGODB_URI = process.env.MONGODB_URI
let PORT = process.env.PORT
let SECRET = process.env.SECRET

module.exports = { MONGODB_URI, PORT, SECRET }
