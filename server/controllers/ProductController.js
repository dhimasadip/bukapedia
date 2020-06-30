const { Product } = require('../models')

class ProductController {

    static list(req,res,next) {
        Product.findAll({
            order: [['name', 'ASC']]
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(() => {
            next({ str_code: 'INTERNAL_SERVER_ERROR' })
        })
    }

    static add(req,res,next) {
        const newProduct = {
            name: req.body.name,
            category: req.body.category,
            description: req.body.description,
            img_url: req.body.img_url,
            price: req.body.price,
            stock: req.body.stock,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        Product.findOne({ where: { name: newProduct.name }})
        .then(data => {
            if (!data) {
                return Product.create(newProduct)
            } else {
                return false
            }
        })
        .then(data => {
            if (data) {
                res.status(201).json(data)
            } else {
                next({ str_code: 'PRODUCT_EXIST' })
            }
        })
        .catch(err => {
            if (err.errors) {
                let err_data = err.errors.map(el => el.message)
                err_data = err_data.join('. ')
                next({ str_code: 'ADD_PRODUCT_VALIDATION', err_data })
            } else {
                next({ str_code: 'INTERNAL_SERVER_ERROR' })
            }
        })
    }

    static get(req,res,next) {
        const { id } = req.params

        Product.findByPk(id)
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                next({ str_code: 'PRODUCT_NOT_FOUND' })
            }
        })
        .catch(() => {
            next({ str_code: 'INTERNAL_SERVER_ERROR' })
        })
    }

    static update(req,res,next) {
        const newProduct = {
            name: req.body.name,
            category: req.body.category,
            description: req.body.description,
            img_url: req.body.img_url,
            price: req.body.price,
            stock: req.body.stock,
            updatedAt: new Date()
        }

        const { id } = req.params

        Product.findOne({ where: { name: newProduct.name }})
        .then(data => {
            if (!data) {
                return Product.update(newProduct, {
                    where: { id },
                    individualHooks: true
                })
            } else {
                return Product.findByPk(id)
            }
        })
        .then(data => {
            if (data[0] == 1) {
                return true

            } else if (data.name == newProduct.name) {
                return Product.update(newProduct, {
                    where: { id },
                    individualHooks: true
                })

            } else {
                return false
            }
        })
        .then(data => {
            if (data) {
                delete newProduct.updatedAt
                newProduct.id = Number(id)
                res.status(200).json(newProduct)
            } else {
                next({ str_code: 'PRODUCT_EXIST' })
            }
        })
        .catch(err => {
            if (err.errors) {
                let err_data = err.errors.map(el => el.message)
                err_data = err_data.join('. ')
                next({ str_code: 'UPDATE_PRODUCT_VALIDATION', err_data })
            } else {
                next({ str_code: 'INTERNAL_SERVER_ERROR' })
            }
        })
    }

    static delete(req,res,next) {
        const { id } = req.params

        Product.findByPk(id)
        .then(data => {
            if (data) {
                return Product.destroy({ where: { id }})
            } else {
                return false
            }
        })
        .then(data => {
            if (data) {
                res.status(200).json({ message: 'Successfully delete product'})
            } else {
                next({ str_code: 'PRODUCT_NOT_FOUND' })
            }
        })
        .catch(() => {
            next({ str_code: 'INTERNAL_SERVER_ERROR' })
        })

    }
}

module.exports = ProductController