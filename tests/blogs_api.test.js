const app = require('../app')
const supertest = require('supertest')
const mongoose = require('mongoose')
const api = supertest(app)
const blogsInDB = require('../utils/blogs_api_helper').blogsInDB
const BlogModel = require('../models/blog')

let token;

beforeEach(async () => {

    const user = {
        username: 'admin',
        password: '123456'
    }
    const res = await api .post('/api/login').send(user)
    token = res.body.token;

    await BlogModel.deleteMany({})

    const blog = {
        author: 'teste indice 0',
        title: 'title indice 0',
        url: 'url.test.com/indice0',
        likes: 123,
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(blog)
})

describe('HTTP verb test', () => {

    test('GET & Type Json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('POST', async () => {
        const blogsBeforePost = await api.get('/api/blogs')

        const newBlog = {
            author: 'TESTANDO O BLOG',
            title: 'title test',
            url: 'url.test.com',
            likes: 123,
        }
    
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAfterPost = await blogsInDB()

        expect(blogsAfterPost).toHaveLength(blogsBeforePost.body.length + 1)
    })

    test('DELETE by id', async () => {
        const blogsBeforeDelete = await blogsInDB()
        const id = blogsBeforeDelete[0].id.toString()

        await api 
            .delete(`/api/blogs/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)

        const blogsAfterDelete = await blogsInDB()

        expect(blogsAfterDelete).toHaveLength(blogsBeforeDelete.length - 1)
    })

    test('PUT by id', async () => {
        const allBlogsInDb = await blogsInDB()
        const firstBlogInDbBeforeRequest = allBlogsInDb[0]
        const changedBlog = {...firstBlogInDbBeforeRequest, title: 'test put by id', author: 'author jest test' }
        const id = firstBlogInDbBeforeRequest.id.toString()

        const res = await api
            .put(`/api/blogs/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(changedBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        expect(firstBlogInDbBeforeRequest).not.toEqual(res.body)

        const allBlogsInDbAfterRequest = await blogsInDB()
        const firstBlogInDbAfterRequest = allBlogsInDbAfterRequest[0]
        expect(firstBlogInDbBeforeRequest).not.toEqual(firstBlogInDbAfterRequest)
    })

})

describe('missing property test', () => {

    test('missing like', async () => {
        const blogsBeforePost = await api.get('/api/blogs')

        const blog = {
            author: 'TESTE SEM LIKES',
            title: 'title test WITHOUT LIKE',
            url: 'url.test.com',
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(blog)
            .expect(400)
        
        const blogsAfterPost = await blogsInDB()
        expect(blogsAfterPost).toHaveLength(blogsBeforePost.body.length)
    })

    test('missing title', async () => {
        const blogsBeforePost = await api.get('/api/blogs')

        const objectWhithoutTitle = {
            author: 'TEST without title',
            url: 'url.test',
            likes: 0
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(objectWhithoutTitle)
            .expect(400)
        
        const blogsAfterPost = await blogsInDB()
        expect(blogsAfterPost).toHaveLength(blogsBeforePost.body.length)
    })

    test('missing url', async () => {
        const blogsBeforePost = await api.get('/api/blogs')

        const objectWhithoutUrl = {
            author: 'TEST without title and url',
            title: 'test title',
            likes: 0
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(objectWhithoutUrl)
            .expect(400)
        
        const blogsAfterPost = await blogsInDB()
        expect(blogsAfterPost).toHaveLength(blogsBeforePost.body.length)
    })
})


test('check if is _id or id', async () => {
    const response = await api .get('/api/blogs')

    response.body.map(r => {
        expect(r.id).toBeDefined();
    })  
})

afterAll( async () => {
    await mongoose.connection.close()
})