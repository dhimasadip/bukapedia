const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const authorization = require('../middlewares/authorization')

router.get('/', ProductController.list)
router.use(authorization)
router.post('/', ProductController.add)
router.get('/:id', ProductController.get)
router.put('/:id', ProductController.update)
router.delete('/:id', ProductController.delete)

module.exports = router