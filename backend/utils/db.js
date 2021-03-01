const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/node-CRM', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))

// create users model
const usersSchema = new mongoose.Schema({
    username: String,
    password: String
  });

const User = mongoose.model('users', usersSchema);
 
exports.User = User