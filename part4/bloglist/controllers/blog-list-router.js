const blogListRouter = require('express').Router()
const BlogEntry = require('../models/blog-entry')
const { response } = require('express')

blogListRouter.get('/', async (req, res, next) => {
  const blogList = await BlogEntry.find({})
  res.json(blogList)
})

blogListRouter.get('/:id', async (req, res, next) => {
  const blog = await BlogEntry.findById(req.params.id)
  blog ? res.json(blog) : res.status(404).end()
})

blogListRouter.delete('/:id', async (req, res, next) => {
  const deletedEntry = await BlogEntry.findByIdAndDelete(req.params.id)
  res.status(204).json(deletedEntry)
})

blogListRouter.put('/:id', async (req, res, next) => {
  const updatedEntry = await BlogEntry.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
  res.json(updatedEntry)
})

blogListRouter.post('/', async (req, res, next) => {
  const newBlogEntry = new BlogEntry({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes,
  })

  const savedEntry = await newBlogEntry.save()
  res.status(201).json(savedEntry)
})

module.exports = blogListRouter
