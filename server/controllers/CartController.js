const { Cart, Product } = require('../models')
const { QueryTypes, Op, Sequelize } = require('sequelize')
const sequelize = new Sequelize(process.env.DB, process.env.UNAME, process.env.PASS, {
    dialect: 'postgres'
})

class CartController {
    static list(req,res,next) {
        const { id } = req.user

        Cart.findAll({
            include: Product,
            where: {
                [Op.and]: [{ UserId: id }, { status: 'unpaid' }]
            },
            order: [['createdAt', 'DESC']]
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next({ str_code: err })
        })
    }

    static add(req,res,next) {
        
        const newCart = {
            UserId: req.user.id,
            ProductId: req.body.productId,
            quantity: req.body.quantity
        }

        Product.findByPk(newCart.ProductId)
        .then(data => {
            newCart.total_price = Number(data.price) * Number(newCart.quantity)
            return Cart.findOne({
                include: Product,
                where: {
                    [Op.and]: [{ UserId: req.user.id }, { ProductId: newCart.ProductId }, { status: 'unpaid' }]
                }
            })
        })
        .then(data => {
            if(data) {
                const updatedQuantity = { 
                    quantity: Number(newCart.quantity) + Number(data.quantity),
                    total_price: (Number(newCart.quantity) + Number(data.quantity)) * Number(data.Product.price)
                }
                return Cart.update(updatedQuantity, {
                    where: { id: data.id }
                })
            } else {
                return Cart.create(newCart)
            }
        })
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            next({ str_code: err })
        })
    }

    static paid(req,res,next) {
        
        let listCart = []
        let queryString = ''

        const { id } = req.user

        Cart.findAll({
            include: Product,
            where: {
                [Op.and]: [{ UserId: id }, { status: 'unpaid' }]
            }
        })
        .then(data => {
            data.forEach(el => {
                listCart.push(el.id)

                let currStock = Number(el.Product.stock) - Number(el.quantity)
                queryString += `UPDATE "Products" SET "stock" = ${currStock} WHERE "id" = ${el.Product.id}; `
            })
            
            return Cart.update({ status: 'paid'}, {
                where: { id: {
                    [Op.in]: listCart
                }}
            })
        })
        .then(data => {
            return sequelize.query(queryString, { type: QueryTypes.UPDATE })
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            // console.log(err)
            
            console.log(process.env.PWD)
            next({ str_code: err })
        })
    }

    static remove(req,res,next) {

        const { id } = req.query

        Cart.destroy({
            where: { id }
        })
        .then(data => {
            res.status(200).json({ message: 'Successfully removed cart' })
        })
        .catch(err => {
            next({ str_code: err })
        })


    }

    static edit(req,res,next) {
        const { quantity, id, total_price } = req.body

        Cart.update({ quantity, total_price }, {
            where: { id }
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next({ str_code: err })
        })
    }
}

module.exports = CartController