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
}, 10000)

describe('when there is initially some blogs saved', () => {
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
})

describe('addition of a new blog', () => {
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

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain('Gilder\'s Daily Prophecy')
  })

  test('if likes are missing, default likes to 0', async () => {
    const newBlog = {
      title:'Man on the Margin',
      author:'Michael Kendall',
      url:'https://manonthemargin.com',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const addedBlog = await blogsAtEnd.find(b => b.title === 'Man on the Margin')
    expect(addedBlog.likes).toBe(0)
  })

  test('if title and url are missing, respond with 400 bad request', async () => {
    const newBlog = {
      author:'George Gilder',
      likes:12
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('update a blog', () => {
  test('blog update successful', async () => {
    const newBlog = {
      title:'The Grovestead',
      author:'Rory Groves',
      url:'https://thegrovestead.com',
      likes:12
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)

    const allBlogs = await helper.blogsInDb()
    const blogToUpdate = allBlogs.find(blog => blog.title === newBlog.title)

    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const foundBlog = blogsAtEnd.find(blog => blog.likes === 13)
    expect(foundBlog.likes).toBe(13)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const newBlog = {
      title:'Man on the Margin',
      author:'Michael Kendall',
      url:'https://manonthemargin.com',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)

    const allBlogs = await helper.blogsInDb()
    const blogToDelete = allBlogs.find(blog => blog.title === newBlog.title)

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length
    )

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

afterAll(() => {
  mongoose.connection.close()
})