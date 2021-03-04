var express = require('express');
var router = express.Router();
// user CRUD middleware
const { register, list, remove, login } = require('../controllers/users')
// auth middleware
const { auth } = require('../middleware/auth')

// get users list
router.get('/', auth, list)
// delete user
router.delete('/', remove)

// user register and login
router.post('/', register);
router.post('/login', login)

module.exports = router;
