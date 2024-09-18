const express = require('express');
const upload = require('../config/multer.config');
const router = express.Router();
const multer = require('multer')


router.post('/create',upload.single("image"),(req, res) => {
    res.send(req.file);
});

module.exports = router;