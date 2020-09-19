const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
    .populate('notes', {
      title: 1,
      content: 1,
      createdOn: 1,
      likes: 1,
      id: 1,
    })
    .populate('comments', {
      content: 1,
      createdOn: 1,
      likes: 1,
    })
  res.json(users)
})

usersRouter.post('/', async (req, res) => {
  if (!req.body.username || !req.body.password)
    return res.status(400).json({ error: 'Requires username and password' })
  if (req.body.password.length < 5)
    return res
      .status(400)
      .json({ error: 'Password must be at least 5 characters' })

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(req.body.password, saltRounds)
  const user = new User({
    username: req.body.username,
    name: req.body.name,
    joinedOn: new Date(),
    passwordHash,
  })
  const savedUser = await user.save()

  res.json(savedUser)
})

module.exports = usersRouter
