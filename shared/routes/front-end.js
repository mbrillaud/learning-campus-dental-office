const express = require('express');
const auth = require('../middlewares/auth');
const router = express.Router();

router.get('/bo', auth, function(req, res) {
    console.log('res : ', req.auth);
    if(req.auth.userStatus === "admin") {
        res.render('back-office/views/index.njk');
    } else {
        res.render('back-office/views/login.njk');
    }
});
router.get('/login', (req, res) => {
    res.render('back-office/views/login.njk');
})

module.exports = router;