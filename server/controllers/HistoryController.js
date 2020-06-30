const { Cart, Product } = require('../models')
const { Op } = require('sequelize')

class HistoryController {
    static histories(req,res,next) {

        Cart.findAll({
            include: Product,
            where: {
                [Op.and]: [{ UserId: req.user.id }, { status: 'paid' }]
            },
            order: [['updatedAt', 'DESC']]
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next({ str_code: err })
        })
    }
}

module.exports = HistoryController