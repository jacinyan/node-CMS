var express = require('express');
var router = express.Router();
// middleware from users controller
const { register, list } = require('../controllers/users')

// user register
router.post('/register', register);
// get users list
router.get('/list', list)

module.exports = router;
