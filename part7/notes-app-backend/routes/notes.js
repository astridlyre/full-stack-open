const notesRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Note = require('../models/note')
const User = require('../models/user')

notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({})
    .populate('user', {
      username: 1,
      name: 1,
    })
    .populate('comments', {
      content: 1,
      createdOn: 1,
      likes: 1,
      user: 1,
    })
  res.json(notes)
})

notesRouter.get('/:id', async (req, res) => {
  const foundNote = await Note.findById(req.params.id)
  foundNote ? res.json(foundNote) : res.status(404).end()
})

notesRouter.post('/', async (req, res) => {
  const token = req.token
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id)
    return res.status(401).json({ error: 'Token missing or invalid' })

  const user = await User.findById(decodedToken.id)
  const newNote = new Note({
    title: req.body.title,
    content: req.body.content,
    createdOn: new Date(),
    user: user._id,
  })
  const savedNote = await newNote.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()

  const payload = await savedNote.populate('user', {
    username: 1,
    name: 1,
  })

  res.status(201).json(payload)
})

notesRouter.put('/:id', async (req, res) => {
  const token = req.token
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id)
    return res.status(401).json({ error: 'Token missing or invalid' })

  const updatedNote = await Note.findById(req.params.id)
  const newLikes = updatedNote.likes.includes(decodedToken.id)
    ? updatedNote.likes.filter(like => like !== decodedToken.id)
    : updatedNote.likes.concat(decodedToken.id)

  updatedNote.likes = newLikes
  await updatedNote.save()
  res.json(updatedNote)
})

notesRouter.delete('/:id', async (req, res) => {
  const token = req.token
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id)
    return res.status(401).json({ error: 'Token missing or invalid' })

  const user = await User.findById(decodedToken.id)

  if (!user.notes.includes(req.params.id))
    return res.status(401).json({ error: 'This does not belong to you!' })

  const deletedNote = await Note.findByIdAndDelete(req.params.id)

  user.notes = user.notes.filter(note => note.toString() !== req.params.id)
  await user.save()
  res.status(204).json(deletedNote)
})

module.exports = notesRouter
