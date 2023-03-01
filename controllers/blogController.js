const blogRouter = require('express').Router()
const BlogModel = require('../models/blogModel')

blogRouter.get('/' , (req, res, next) => {
    BlogModel.find({})
        .then(allBlogData => {
            res.json(allBlogData)
        })
        .catch(error => next(error))
})

blogRouter.get('/:id', (req, res, next) => {
    BlogModel.findById(req.params.id)
        .then(singleBlogData => {
            res.json(singleBlogData)
        })
        .catch(error => next(error))
})

blogRouter.post('/', (req, res, next) => {
    const body = req.body

    const blog = new BlogModel({
        author: body.author,
        title: body.title,
        url: body.url,
        likes: body.likes,
    })

    blog.save()
        .then(savedBlog => {
            res.json(savedBlog)
        })
        .catch(error => next(error))


})

module.exports = blogRouter
