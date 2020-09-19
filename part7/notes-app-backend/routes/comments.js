const commentsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Comment = require('../models/comment')
const User = require('../models/user')

commentsRouter.get('/', async (req, res) => {
  const comments = await Comment.find({})
    .populate('user', {
      username: 1,
      name: 1,
    })
    .populate('note', {
      title: 1,
      createdOn: 1,
      likes: 1,
      user: 1,
    })
  res.json(comments)
})

commentsRouter.get('/:id', async (req, res) => {
  const foundComment = await Comment.findById(req.params.id)
  foundNote ? res.json(foundNote) : res.status(404).end()
})

commentsRouter.post('/', async (req, res) => {
  const token = req.token
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id)
    return res.status(401).json({ error: 'Token missing or invalid' })

  const user = await User.findById(decodedToken.id)
  const newComment = new Comment({
    content: req.body.content,
    createdOn: new Date(),
    user: user._id,
    note: req.body.noteId,
  })
  const savedComment = await newComment.save()
  user.comments = user.comments.concat(savedComment._id)
  await user.save()

  const payload = await savedComment.populate('user', {
    username: 1,
    name: 1,
  })

  res.status(201).json(payload)
})

commentsRouter.put('/:id', async (req, res) => {
  const token = req.token
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id)
    return res.status(401).json({ error: 'Token missing or invalid' })

  const updatedComment = await Comment.findById(req.params.id)
  const newLikes = updatedComment.likes.includes(decodedToken.id)
    ? updatedComment.likes.filter(like => like !== decodedToken.id)
    : updatedComment.likes.concat(decodedToken.id)

  updatedComment.likes = newLikes
  await updatedComment.save()
  res.json(updatedComment)
})

commentsRouter.delete('/:id', async (req, res) => {
  const token = req.token
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id)
    return res.status(401).json({ error: 'Token missing or invalid' })

  const user = await User.findById(decodedToken.id)
  const note = await note.findById(req.body.noteId)

  if (!user.comments.includes(req.params.id))
    return res.status(401).json({ error: 'This does not belong to you!' })

  const deletedComment = await Comment.findByIdAndDelete(req.params.id)
  user.comments = user.comments.filter(
    comment => comment.toString() !== req.params.id
  )
  await user.save()

  note.comments = note.comments.filter(
    comment => comment.toString() !== req.params.id
  )
  await note.save()

  res.status(204).json(deletedComment)
})

module.exports = commentsRouter
