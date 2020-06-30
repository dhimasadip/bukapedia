const router = require('express').Router()
const CartController = require('../controllers/CartController')

router.get('/', CartController.list)
router.post('/', CartController.add)
router.put('/', CartController.paid)

module.exports = router