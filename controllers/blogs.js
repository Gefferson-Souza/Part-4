require('dotenv').config()
const blogRouter = require('express').Router()
const BlogModel = require('../models/blog')
const userExtractor = require('../utils/middleware').userExtractor

blogRouter.get('/' , async (req, res, next) => {
    try {
        const blogsInDb = await BlogModel.find({}).populate('user', {username:1 , name:1})
        res.status(200).json(blogsInDb)
    }catch(err){
        next(err)
    }
})

blogRouter.get('/:id', async (req, res, next) => {
    try{
        const blog = await BlogModel.findById(req.params.id)
        res.status(200).json(blog)
    }catch(err){
        next(err)
    }
})

blogRouter.post('/',userExtractor, async (req, res, next) => {
    try{
        const {author, title, url, likes} = req.body

        const user = req.user

        if(!user._id){
            return res.status(404).json({error: 'User not found'})
        }

        const blog = new BlogModel({
            author,
            title,
            url,
            likes,
            user: user._id
        })
            
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        res.status(201).json(savedBlog)

    }catch(err){
        next(err)
    }
})

blogRouter.delete('/:id',userExtractor, async (req, res, next) => {
    try{
      const blog = await BlogModel.findById(req.params.id)

        if(!blog){
            return res.status(404).json({error: 'Blog not found'})
        }

        const user = req.user
        if(!user._id){
            return res.status(404).json({error: 'User not found'})
        }

        const id = blog.user

        if(id.toString() === user._id.toString()){
            await BlogModel.findByIdAndRemove(req.params.id)
            return res.status(204).end()
        }else{
            return res.status(403).json({error: "Invalid request! Only the creator can remove the blog"})
        }  
    }catch(err){
        next(err)
    }
})

blogRouter.put('/:id', async (req, res, next) => {
    try{
        const {author, title, url, likes} = req.body

        const blog = {
            author,
            title,
            url,
            likes,
        }
        const updatedBlog = await BlogModel.findByIdAndUpdate(
            req.params.id,
            blog,
            {
                new:true,
                runValidatores:true
            })
            
        if(!updatedBlog){
            return res.status(404).end()
        }

        res.status(201).json(updatedBlog)
            
    }catch(err){
        next(err)
    }
    
})

module.exports = blogRouter
