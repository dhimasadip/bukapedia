const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const authorization = require('../middlewares/authorization')
const authentication = require('../middlewares/authentication')

router.get('/', ProductController.list)
router.get('/:id', ProductController.get)
router.use(authentication)
router.post('/', authorization,  ProductController.add)
router.put('/:id', authorization, ProductController.update)
router.delete('/:id', authorization, ProductController.delete)

module.exports = router