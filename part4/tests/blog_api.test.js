const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

test('blogs returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  expect(titles).toContain('Thoughts and Ideas')
})

test('unique default identifier of blog posts is _id', async () => {
  const blogs = await Blog.find({})
  expect(blogs[0]._id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Gilder\'s Daily Prophecy',
    author: 'George Gilder',
    url: 'gildersdailyprophecy.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsPostPost = await helper.blogsInDb()
  expect(blogsPostPost).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsPostPost.map(b => b.title)
  expect(titles).toContain('Gilder\'s Daily Prophecy')
})

/* test('blog without title is not added', async () => {
  const newBlog = {
    author: 'Patrick Jones'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsPostPost = await helper.blogsInDb()
  expect(blogsPostPost).toHaveLength(helper.initialBlogs.length)
}) */

afterAll(() => {
  mongoose.connection.close()
})