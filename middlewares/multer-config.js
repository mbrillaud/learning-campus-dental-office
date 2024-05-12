const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = (destination) => multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, destination);
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_').split('.').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = (destination) => multer({ storage: storage(destination) }).single('image');
