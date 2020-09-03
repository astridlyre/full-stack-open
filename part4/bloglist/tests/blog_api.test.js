const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const BlogEntry = require('../models/blog-entry')

beforeEach(async () => {
  await BlogEntry.deleteMany({})

  for (let entry of helper.initialBlogEntries) {
    let newBlogEntry = new BlogEntry(entry)
    await newBlogEntry.save()
  }
})

test(`all blogs are returned, content type is json`, async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const allBlogs = await helper.blogsInDb()

  expect(allBlogs).toHaveLength(helper.initialBlogEntries.length)
})

test('unique identifier is called id, and each blog has an id', async () => {
  const allBlogs = await helper.blogsInDb()

  const blogToTest = allBlogs[0]

  expect(blogToTest.id).toBeDefined()

  const ids = allBlogs.map(b => b.id)

  ids.forEach(id => expect(id).toBeDefined())
})

test('a valid blog can be created and it is stored properly', async () => {
  const newBlogEntry = {
    title: 'I love cows',
    author: 'Harold',
    url: 'http://www.moo.cow',
    likes: 2,
  }

  await api
    .post('/api/blogs')
    .send(newBlogEntry)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogEntries.length + 1)

  const titles = blogsAtEnd.map(r => r.title)
  expect(titles).toContain('I love cows')
})

test('blog entry without likes is added with default value of 0 and total number of blogs increases', async () => {
  const newBlogEntry = {
    title: 'Wes',
    author: 'Anderson',
    url: 'http://www.wesanderson.com/blog',
  }

  const response = await api.post('/api/blogs').send(newBlogEntry)

  expect(response.status).toBe(201)
  expect(response.body.likes).toBe(0)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogEntries.length + 1)
})

test('blog entry without title and url cannot be added and response is 400', async () => {
  const newBlogEntry = {
    author: 'Anderson',
    likes: 9809890189011,
  }

  await api.post('/api/blogs').send(newBlogEntry).expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogEntries.length)
})

test('a specific blog entry can be viewed', async () => {
  const startingEntries = await helper.blogsInDb()

  const entryToView = startingEntries[0]

  const resultBlog = await api
    .get(`/api/blogs/${entryToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const processedEntryToView = JSON.parse(JSON.stringify(entryToView))

  expect(resultBlog.body).toEqual(processedEntryToView)
})

test('a blog entry can be deleted', async () => {
  const startingEntries = await helper.blogsInDb()

  const entryToDelete = startingEntries[0]

  await api.delete(`/api/blogs/${entryToDelete.id}`).expect(204)

  const endingBlogs = await helper.blogsInDb()

  expect(endingBlogs).toHaveLength(helper.initialBlogEntries.length - 1)

  const titles = endingBlogs.map(r => r.title)

  expect(titles).not.toContain(entryToDelete.title)
})

afterAll(() => {
  mongoose.connection.close()
})
