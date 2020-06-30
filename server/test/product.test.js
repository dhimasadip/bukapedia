const request = require('supertest')
const app = require('../app')
const { queryInterface } = require('../models').sequelize
const { User } = require('../models')
const { token } = require('../helpers/generate_JWT')
let access_token = ''
let id_test = ''

const product_example = {
    name: 'Macbeth Eliot black white',
    category: 'Sneakers',
    description: 'Macbeth Eliot Black/White Tom era',
    img_url: 'trial',
    price: 500000,
    stock: 7
}
const update_example = {
    name: 'vans',
    category: 'Sneakers',
    description: 'vans oldskool',
    img_url: 'trial.co.id',
    price: 665000,
    stock: 9
}


beforeAll((done) => {
    const admin = {
        name: 'Admin',
        email: 'admin40@mail.com',
        password: 'pass1234',
        role: 'admin'
    }

    User.create(admin)
    .then(data => {
        let userData = data.dataValues
        delete userData.password
        delete userData.createdAt
        delete userData.updatedAt

        access_token = token(userData)
        done()
    })
    .catch(err => {
        if (err.errors)  console.log(err.errors)
        
        done(err)
    })

})

afterAll((done) => {
    return queryInterface.bulkDelete('Products', {})
    .then(() => {
        return queryInterface.bulkDelete('Users', {})
    })
    .then(() => {
        done()
    })
    .catch(err => {
        done(err)
    })
})


describe('POST /products', () => {
    it('test add product', (done) => {
        request(app)
        .post('/products')
        .set('access_token', access_token)
        .send(product_example)
        .end((err,response) => {
            if (err) done(err)
            else {
                const { body, status } = response

                if (body.message) {
                    throw(body.message)
                } else {
                    // console.log(body)
                    expect(status).toBe(201)
                    expect(body).toHaveProperty('id', expect.any(Number))
                    expect(body).toHaveProperty('name', product_example.name)
                    expect(body).toHaveProperty('category', product_example.category)
                    expect(body).toHaveProperty('description', product_example.description)
                    expect(body).toHaveProperty('img_url', product_example.img_url)
                    expect(body).toHaveProperty('price', expect.any(Number))
                    expect(body).toHaveProperty('stock', expect.any(Number))
                    id_test = body.id
                    done()
                }
            }
        })
    }),
    it('test fail add product: empty/wrong input', (done) => {
        request(app)
        .post('/products')
        .set('access_token', access_token)
        .send({
            name: '',
            category: '',
            description: '',
            img_url: '',
            price: 0,
            stock: 0
        })
        .end((err,response) => {
            if (err) done(err)
            else {
                const { body, status } = response

                expect(status).toBe(400)
                expect(body).toHaveProperty('message', expect.any(String))
                done()
               
            }
        })
    })
})


describe('GET /products', () => {
    it('test list products', (done) => {
        request(app)
        .get('/products')
        .set('access_token', access_token)
        .end((err,response) => {
            if (err) done(err)
            else {
                const { body, status } = response

                if (body.message) {
                    throw(body.message)
                } else {
                    // console.log(body)
                    expect(status).toBe(200)
                    done()
                }
            }
        })
    })
})


describe('GET /products/:id', () => {
    it('test get product by id', (done) => {
        request(app)
        .get(`/products/${id_test}`)
        .set('access_token', access_token)
        .end((err,response) => {
            if (err) done(err)
            else {
                const { body, status } = response

                if (body.message) {
                    throw(body.message)
                } else {
                    // console.log(body)
                    expect(status).toBe(200)
                    expect(body).toHaveProperty('id', expect.any(Number))
                    expect(body).toHaveProperty('name', product_example.name)
                    expect(body).toHaveProperty('category', product_example.category)
                    expect(body).toHaveProperty('description', product_example.description)
                    expect(body).toHaveProperty('img_url', product_example.img_url)
                    expect(body).toHaveProperty('price', expect.any(Number))
                    expect(body).toHaveProperty('stock', expect.any(Number))
                    done()
                }
            }
        })
    }),
    it('test fail get product by id', (done) => {
        request(app)
        .get('/products/1000')
        .set('access_token', access_token)
        .end((err,response) => {
            if (err) done(err)
            else {
                const { body, status } = response

                expect(status).toBe(404)
                expect(body).toHaveProperty('message', 'Product Not Found')
                done()
                
            }
        })
    })
})


describe('PUT /products/:id', () => {
    it('test update product by id', (done) => {
        request(app)
        .put(`/products/${id_test}`)
        .set('access_token', access_token)
        .send(update_example)
        .end((err,response) => {
            if (err) done(err)
            else {
                const { body, status } = response

                if (body.message) {
                    throw(body.message)
                } else {
                    // console.log(body)
                    expect(status).toBe(200)
                    expect(body).toHaveProperty('id', expect.any(Number))
                    expect(body).toHaveProperty('name', update_example.name)
                    expect(body).toHaveProperty('category', update_example.category)
                    expect(body).toHaveProperty('description', update_example.description)
                    expect(body).toHaveProperty('img_url', update_example.img_url)
                    expect(body).toHaveProperty('price', expect.any(Number))
                    expect(body).toHaveProperty('stock', expect.any(Number))
                    done()
                }
            }
        })
    }),
    it('test fail update product by id', (done) => {
        request(app)
        .put(`/products/${id_test}`)
        .set('access_token', access_token)
        .send({
            name: '',
            category: '',
            description: '',
            img_url: '',
            price: '',
            stock: ''
        })
        .end((err,response) => {
            if (err) done(err)
            else {
                const { body, status } = response

                expect(status).toBe(400)
                expect(body).toHaveProperty('message', expect.any(String))
                done()
              
            }
        })
    })
})


describe('DELETE /products/:id', () => {
    it('test delete product by id', (done) => {
        request(app)
        .delete(`/products/${id_test}`)
        .set('access_token', access_token)
        .end((err,response) => {
            if (err) done(err)
            else {
                const { body, status } = response

                expect(status).toBe(200)
                expect(body).toHaveProperty('message', 'Successfully delete product')
                done()
                
            }
        })
    }),
    it('test fail delete product by id', (done) => {
        request(app)
        .delete('/products/1000')
        .set('access_token', access_token)
        .end((err,response) => {
            if (err) done(err)
            else {
                const { body, status } = response

                expect(status).toBe(404)
                expect(body).toHaveProperty('message', 'Product Not Found')
                done()
                
            }
        })
    })
})



