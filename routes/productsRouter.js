const express = require('express');
const router = express.Router();

router.get('/',(req, res) => {
    res.send("heyy! its working");
});

module.exports = router;