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

function fileFilter(req, file, cb) {
    const acceptType = [
        'image/png',
        'image/jpg',
        'image/jpeg',
        'image/gif'
    ]

    if (!acceptType.includes(file.mimetype)) {
        cb(new Error('File type must be either png,jpg or gif'))
    } else {
        // To accept the file pass `true`, like so:
        cb(null, true)
    }

}

const upload = multer({
    storage,
    limits,
    fileFilter
}).single('logo')

// upload.single('logo')
const uploadMiddleware = (req, res, next) => {
    upload(req, res, function (err) {
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
        } else {
            req.logo = filename
            next()
        }
    })
}

module.exports = uploadMiddleware