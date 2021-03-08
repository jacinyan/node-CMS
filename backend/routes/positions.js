const express = require('express')
const router = express.Router()

const { add, list , remove} = require('../controllers/positions')
const uploadMiddleware = require('../middleware/upload')

router.get('/list', list)
router.post('/add', uploadMiddleware, add)
router.delete('/remove', remove)

module.exports = router