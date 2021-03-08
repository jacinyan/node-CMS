const path = require('path')
const multer = require('multer')
const mime = require('mime')

let filename = ''

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../public/uploads/'))
    },
    filename: function (req, file, cb) {
        let extension = mime.getExtension(file.mimetype)
        filename = file.fieldname + '-' + Date.now() + '.' + extension
        cb(null, filename)
    }
})

const limits = {
    fileSize: 200000,
    files: 1
}

function fileFilter (req, file, cb) {
    const acceptType = [
        'image/png',
        'image/jpg',
        'image/jpeg',
        'image/gif'
    ]

    const mimetype = mime.getType(file.mimetype)
    if (acceptType.includes(mimetype)){
        cb(new Error('File type must be either \'png,jpg or gif\''))
    }
  
  }

const upload = multer({
    storage,
    limits,
    fileFilter
}).single('logo')

// upload.single('logo')
const uploadMiddleware = (req, res, next) => {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            res.render('fail', {
                data: JSON.stringify({
                    message: 'File exceeds 200K'
                })
            })
        } else if (err) {
            res.render('fail', {
                data: JSON.stringify({
                    message: err.message
                })
            })
        }

        next()
    }) 
}

module.exports = uploadMiddleware