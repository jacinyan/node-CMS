var express = require('express');
var router = express.Router();

const { register } = require('../controllers/users')
// middleware from users controller
router.post('/register', register);



module.exports = router;
