const app = require('../app')
const supertest = require('supertest')
const mongoose = require('mongoose')
const api = supertest(app)
const User = require('../models/user')

const usersInDb = require('../utils/users_api_helper')

beforeEach(async () => {
    await User.deleteMany({})

    const admin = {
        username:"admin",
        name:"Gefferson",
        password:"123456"
    }
    
    await api.post('/api/users').send(admin)
})


describe('HTTP POST, creating new user, valid and invalid', () => {

    test('valid user', async () => {
        const usersInDbBeforeTest = await usersInDb()

        const user = {
            username: "TESTE",
            name:"testando 123",
            password:"0987654321"
        }

        await api
            .post('/api/users')
            .send(user)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersInDbAfterTest = await usersInDb()
        expect(usersInDbAfterTest).toHaveLength(usersInDbBeforeTest.length + 1)

    })

    test('invalid user, missing username', async () => {
        const usersInDbBeforeTest = await usersInDb()

        const user = {
            name:"testando 123",
            password:"0987654321"
        }

        await api
            .post('/api/users')
            .send(user)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersInDbAfterTest = await usersInDb()
        expect(usersInDbAfterTest).toHaveLength(usersInDbBeforeTest.length)

    })

    test('invalid user, missing name', async () => {
        const usersInDbBeforeTest = await usersInDb()

        const user = {
            username:"testando 123",
            password:"0987654321"
        }

        await api
            .post('/api/users')
            .send(user)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersInDbAfterTest = await usersInDb()
        expect(usersInDbAfterTest).toHaveLength(usersInDbBeforeTest.length)

    })

    test('invalid user, missing password', async () => {
        const usersInDbBeforeTest = await usersInDb()

        const user = {
            username: "TESTE",
            name:"testando 123",
        }

        await api
            .post('/api/users')
            .send(user)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersInDbAfterTest = await usersInDb()
        expect(usersInDbAfterTest).toHaveLength(usersInDbBeforeTest.length)
    })

    test('invalid user, username should be at least 3 characters', async () => {
        const usersInDbBeforeTest = await usersInDb()

        const user = {
            username: "TE",
            name:"testando 123",
            password:"0987654321"
        }

        await api
            .post('/api/users')
            .send(user)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersInDbAfterTest = await usersInDb()
        expect(usersInDbAfterTest).toHaveLength(usersInDbBeforeTest.length)
    })

    test('invalid user, password should be at least 3 characters', async () => {
        const usersInDbBeforeTest = await usersInDb()

        const user = {
            username: "TESTE",
            name:"testando 123",
            password:"12"
        }

        await api
            .post('/api/users')
            .send(user)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersInDbAfterTest = await usersInDb()
        expect(usersInDbAfterTest).toHaveLength(usersInDbBeforeTest.length)
    })

})
    
afterAll(async () => {
    await mongoose.connection.close()
})