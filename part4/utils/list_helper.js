const dummy = blogs => 1

const totalLikes = blogs => blogs.reduce((a, b) => a + b.likes, 0)

const favoriteBlog = blogs => blogs.reduce((a, b) =>
  b.likes > a
    ? b.likes
    : a, blogs[0].likes)

const mostBlogs = blogs => {
  const result = blogs.reduce((a, b) => {
    let known = a.find(found => found.author === b.author)

    if (!known) {
      return a.concat({ author: b.author, blogs: 1 })
    }

    known.blogs++
    return a
  }, [])

  return result.reduce((a, b) =>
    a.blogs > b.blogs
      ? a
      : b
  )
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}