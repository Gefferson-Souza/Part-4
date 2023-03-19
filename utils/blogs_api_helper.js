const BlogModel = require('../models/blog')

const blogsInDB = async () => {
    const allBlogs = await BlogModel.find({})
    return allBlogs.map(blog => blog.toJSON()) 
}


module.exports = {
    blogsInDB
}