const express = require('express')
const router = express.Router()

const { add, list , remove} = require('../controllers/positions')

router.get('/list', list)
router.post('/add', add)
router.delete('/remove', remove)

module.exports = router