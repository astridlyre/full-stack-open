const blogListRouter = require('express').Router()
const BlogEntry = require('../models/blog-entry')

blogListRouter.get('/', (req, res, next) => {
  BlogEntry.find({})
    .then(blogList => {
      blogList ? res.json(blogList) : res.status(204).end()
    })
    .catch(e => next(e))
})

blogListRouter.post('/', (req, res, next) => {
  const newBlogEntry = new BlogEntry({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes,
  })

  newBlogEntry
    .save()
    .then(savedBlogEntry => {
      res.status(201).json(savedBlogEntry)
    })
    .catch(e => next(e))
})

module.exports = blogListRouter
