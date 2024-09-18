const express = require('express');
const app = express();
const router = express.Router();
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const { generateToken } = require('../utils/generateToken');
const { registerUser, loginUser, logoutUser } = require('../controllers/authController');

dotenv.config();

app.use(cookieParser());


router.get('/',(req, res) => {
    res.send("heyy! its working");
});

router.post('/register',registerUser);

router.post('/login',loginUser);

router.get('/logout',logoutUser);

module.exports = router;