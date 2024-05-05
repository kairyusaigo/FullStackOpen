const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs
      .map(blog => blog.likes)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {}

  const blogTrim = blogs.map(({ title, author, likes }) => ({ title, author, likes }))
  const maxLikes = blogTrim.reduce((accumulator, currentValue) => (accumulator.likes > currentValue) ? accumulator.likes : currentValue , 0)
  return blogTrim[blogTrim.indexOf(maxLikes)]
}

module.exports = {
  dummy, totalLikes, favoriteBlog
}