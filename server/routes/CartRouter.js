const router = require('express').Router()
const CartController = require('../controllers/CartController')

router.get('/', CartController.list)
router.post('/', CartController.add)
router.put('/pay', CartController.paid)
router.put('/', CartController.edit)
router.delete('', CartController.remove)

module.exports = router