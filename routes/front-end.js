const express = require('express');
const auth = require('../middlewares/auth');
const router = express.Router();

router.get('/bo', auth, function(req, res) {
    console.log('res : ', req.auth);
    if(req.auth.userStatus === "admin") {
        res.render('./bo.njk');
    } else {
        res.render('./login.njk');
    }
});
router.get('/login', (req, res) => {
    res.render('./login.njk');
})

module.exports = router;