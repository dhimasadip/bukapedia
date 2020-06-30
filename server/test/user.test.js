const request = require('supertest')
const app = require('../app')
const { queryInterface } = require('../models').sequelize


afterAll((done) => {
    return queryInterface.bulkDelete('Users', {})
    .then(() => {
        return queryInterface.bulkDelete('Products', {})
    })
    .then(() => {
        done()
    })
    .catch(err => {
        throw(err)
    })
})

describe('POST /register', () => {
    it('test register', (done) => {
        request(app)
        .post('/register')
        .send({
            name: 'Admin',
            email: 'admin2@mail.com',
            password: 'pass1234',
            role: 'admin'
        })
        .end((err,response) => {
            if(err) throw (err)
            else {
                const { body, status } = response

                if (body.message) {
                    throw(body.message)
                } else {
                    // console.log(body)
                    expect(status).toBe(201)
                    expect(body).toHaveProperty('name', 'Admin')
                    expect(body).toHaveProperty('email', 'admin2@mail.com')
                    expect(body).toHaveProperty('role', 'admin')
                    done()
                }

            }
        })
    }),
    it('test fail register', (done) => {
        request(app)
        .post('/register')
        .send({
            name: '',
            email: '',
            password: '',
            role: ''
        })
        .end((err,response) => {
            if(err) throw (err)
            else {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', expect.any(String))
                done()
            }
        })
    })
})


describe('POST /login', () => {
    it('test login', (done) => {
        request(app)
        .post('/login')
        .send({
            email: 'admin2@mail.com',
            password: 'pass1234'
        })
        .end((err, response) => {
            if (err) throw (err)
            else {
                const { body, status } = response
               
                if (body.message) {
                    throw(body.message)
                } else {
                    access_token = body.access_token
                    // console.log(body)
                    expect(status).toBe(200)
                    expect(body).toHaveProperty('id', expect.any(Number))
                    expect(body).toHaveProperty('name', expect.any(String))
                    expect(body).toHaveProperty('email', 'admin2@mail.com')
                    done()
                }
            }
        })
    }),
    it('test fail login', (done) => {
        request(app)
        .post('/login')
        .send({
            email: 'admin2@mail.com',
            password: ''
        })
        .end((err, response) => {
            if (err) throw (err)
            else {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', expect.any(String))
                done()
               
            }
        })
    }),
    it('test fail login', (done) => {
        request(app)
        .post('/login')
        .send({
            email: 'admin123@mail.com',
            password: 'pass1234'
        })
        .end((err, response) => {
            if (err) throw (err)
            else {
                const { body, status } = response
                expect(status).toBe(404)
                expect(body).toHaveProperty('message', expect.any(String))
                done()
               
            }
        })
    })
})

