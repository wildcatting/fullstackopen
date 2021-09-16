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

const nonExistingId = async () => {
  const blog = new Blog({ title: 'Man on the Margin', author: 'Michael Kendall' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}