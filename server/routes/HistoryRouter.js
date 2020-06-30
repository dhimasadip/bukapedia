const router = require('express').Router()
const HistoryController = require('../controllers/HistoryController')

router.get('/', HistoryController.histories)

module.exports = router