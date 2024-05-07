const express = require('express');
const auth = require('../middlewares/auth');
const router = express.Router();

router.get('/bo', auth, function(req, res) {
    if(req.auth.userStatus === "admin") {
        res.render('./bo.njk');
    } else {
        res.render('./login.njk');
    }
});
router.get('/login', (req, res) => {
    res.render('./login.njk');
});
router.get('/signup', (req, res) => {
    res.render('./signup.njk');
});
router.get('/', (req, res) => {
    res.render('./index.njk');
});
router.get('/news', (req, res) => {
    res.render('./news.njk');
});
router.get('/appointment', (req, res) => {
    res.render('./appointment.njk');
});
router.get('/services', (req, res) => {
    res.render('./services.njk');
});

module.exports = router;