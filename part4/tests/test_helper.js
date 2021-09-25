const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Jun\'s Stack',
    author: 'Jun Sung Lee',
    url: 'https://junsunglee.com'
  },
  {
    title: 'Thoughts and Ideas',
    author: 'Matthew C. Lind',
    url: 'http://matthewclind.com'
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb, usersInDb
}