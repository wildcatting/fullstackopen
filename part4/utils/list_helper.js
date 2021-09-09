const dummy = blogs => 1

const totalLikes = blogs => blogs.reduce((total, blog) => total + blog.likes, 0)

const favoriteBlog = (blogs) => blogs.reduce((total, blog) => blog.likes > total ? blog.likes : total, blogs[0].likes)

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}