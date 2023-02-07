const multer = require(`multer`)
const path = require(`path`)

// storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `./profile`)
    },

    // define filename for upload file 
    filename: (req, file, cb) => {
        cb(null, `profile-${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    // storage config
    storage: storage,
    // filter upload file
    fileFilter: (req, file, cb) => {
        // filter type of file
        const acceptedType = [`image/jpg`, `image/jpg`, `image/png`]
        if (!acceptedType.includes(file.mimetype)) {
            cb(null, false) //refuse upload
            return cb(`Invalid file type(${file.mimetype})`)
        }
        // filter size of file 
        const fileSize = req.headers[`content-length`]
        const maxSize = (1 * 1024 * 1024)//max:1MB
        if (fileSize > maxSize) {
            cb(null, false)//refuse upload
            return cb(`File size is too large`)
        }
        cb(null, true)
    }

})
module.exports = upload

