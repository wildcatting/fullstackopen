const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Jun\'s Stack',
    author: 'Jun Sung Lee',
    url: 'https://junsunglee.com',
    likes: 7
  },
  {
    title: 'Thoughts and Ideas',
    author: 'Matthew C. Lind',
    url: 'http://matthewclind.com',
    likes: 5
  },
  {
    title: 'The Masculinist',
    author: 'Aaron Renn',
    url:'https://themasculinist.com',
    likes: 111111
  }
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