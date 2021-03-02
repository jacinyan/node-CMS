var express = require('express');
var router = express.Router();
// middleware from users controller
const { register, list, remove } = require('../controllers/users')

// user register
router.post('/',  register);
// get users list
router.get('/',  list)
// delete user
router.delete('/', remove)

module.exports = router;
