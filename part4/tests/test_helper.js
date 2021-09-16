const Blog = require('../models/blog')

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

module.exports = {
  initialBlogs, blogsInDb
}