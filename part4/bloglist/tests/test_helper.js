const BlogEntry = require('../models/blog-entry')

const initialBlogEntries = [
  {
    title: 'My cool blog post',
    author: 'Daniel',
    url: 'http://www.coolblog.com',
    likes: 5,
  },
  {
    title: 'Spiffy bois',
    author: 'Ashley',
    url: 'http://www.getspiffybois.org',
    likes: 87,
  },
]

const nonExistingId = async () => {
  const newBlogEntry = new BlogEntry({
    title: 'Not gonna work',
    author: 'Fake Guy',
    url: 'http://www.fake.url',
    likes: 29890,
  })
  await newBlogEntry.save()
  await newBlogEntry.remove()

  return newBlogEntry._id.toString()
}

const blogsInDb = async () => {
  const blogs = await BlogEntry.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogEntries,
  nonExistingId,
  blogsInDb,
}
