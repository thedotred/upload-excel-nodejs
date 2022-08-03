const multer = require('multer');

// Configure the 'localUploadStorage'
const localUploadStorage = multer.diskStorage({
    // in 'destination' option, you can either run a
    // database query to get the destination name 
    // dynamically OR 
    // if the user sends the destination from the 
    // front-end, you can grab it from 'req' object
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    // in 'filename' option, you can change the file name
    // to whatever you want. In our case, we always 
    // timestamp as a prefix (as shown below)
    filename: function (req, file, cb) {
        // 'Date.now()' gives us the timestamp
        cb(null, Date.now() + '-' + file.originalname );
    }
});

// Assign the 'diskStorage' to multer storage
const localUploadMiddleware = multer({ storage: localUploadStorage });

module.exports = {
    localUploadMiddleware
}