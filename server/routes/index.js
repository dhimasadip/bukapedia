const router = require('express').Router()
const UserRouter = require('./UserRouter')
const ProductRouter = require('./ProductRouter')
const CartRouter = require('./CartRouter')
const HistoryRouter = require('./HistoryRouter')
const authentication = require('../middlewares/authentication')

router.use('/', UserRouter)
router.use(authentication)
router.use('/products', ProductRouter)
router.use('/my-cart', CartRouter)
router.use('/histories', HistoryRouter)

module.exports = router