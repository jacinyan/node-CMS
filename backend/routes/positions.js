const express = require('express')
const router = express.Router()

const { add, list , remove} = require('../controllers/positions')
const upload = require('../middleware/upload')

router.get('/list', list)
router.post('/add', upload.single('logo'), add)
router.delete('/remove', remove)

module.exports = router