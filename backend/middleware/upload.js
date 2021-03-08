const path = require('path')
const multer = require('multer')
const mime = require('mime')

let filename = ''

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../public/uploads/'))
    },
    filename: function (req, file, cb) {
        let extension = mime.getExtension(file.mimetype)
        filename = file.fieldname + '-' + Date.now() + '.' + extension
        cb(null, filename)
    }
})

var upload = multer({ storage })

module.exports = upload