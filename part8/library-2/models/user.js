const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  name: {
    type: String,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
  },
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)
