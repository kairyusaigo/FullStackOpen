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

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {}

  const blogCounts = blogs
    .reduce((blogCount, blog) => {
      blogCount[blog.author] = (blogCount[blog.author] || 0) +1
      return blogCount
    }, {})

  const authorSort = Object.entries(blogCounts).sort((a,b) => b[1]-a[1])

  return {
    author: authorSort[0][0],
    blogs: authorSort[0][1]
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {}

  const likeCounts = blogs
    .reduce((likeCount, blog) => {
      likeCount[blog.author] = (likeCount[blog.author] || 0) + blog.likes
      return likeCount
    }, {})

  const authorSort = Object.entries(likeCounts).sort((a,b) => b[1]-a[1])

  return {
    author: authorSort[0][0],
    likes: authorSort[0][1]
  }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}