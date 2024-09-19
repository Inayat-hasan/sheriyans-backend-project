const express  = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generateToken');
const userModel = require('../models/user.model');
const flash = require('connect-flash');

module.exports.registerUser = async (req, res) => {
    try {
        let {email , password, fullname} = req.body;

        let user = await userModel.findOne({email: email});
        if(user) return res.status(401).send("You already have an account, please login");

        bcrypt.genSalt(10,(err, salt) => {
            bcrypt.hash(password, salt,async (err, hash) => {
                if(err) {return res.send(err.message)} else {
                    let user = await userModel.create({
                        email,
                        password: hash,
                        fullname
                    });
                    let token = generateToken(user);
                    // res.cookie('token',token);
                    // res.redirect();
                    res.send('user created successfully')
                };
            })
        })
    } catch (error) {
        console.log(error.message);
    }
};

module.exports.loginUser = async (req, res) => {
    let {email, password} = req.body;
    let user = await userModel.findOne({email: email});
    if(!user) return res.status(500).send('Email or password is incorrect');

    bcrypt.compare(password, user.password, (err, result) => {
        if(result){
            let token = generateToken(user);
            res.cookie('token',token)
            res.redirect('/shop')
        } else {
            req.flash("error","email or password is incorrect");
            res.redirect('/');
        }
    })
};

module.exports.logoutUser = (req, res) => {
    res.cookie('token','');
    res.redirect('/');
};