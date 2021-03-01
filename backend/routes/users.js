var express = require('express');
var router = express.Router();
// middleware from users controller
const { register } = require('../controllers/users')


// user register
router.post('/register', register);

module.exports = router;
