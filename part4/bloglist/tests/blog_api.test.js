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

test(`blogs are returned as json`, async () => {
  console.log('entered test')
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blog posts are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogEntries.length)
})

test('a specific author is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.author)

  expect(contents).toContain('Daniel')
})

test('a valid blog can be added', async () => {
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

test('blog entry without title is not added', async () => {
  const newBlogEntry = {
    author: 'Anderson',
    likes: 398878,
    url: 'http://www.wes.ca',
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
