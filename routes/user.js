const express = require('express')
const router = express.Router();

const User = require('../models/user')

router.get('/signin', (req, res) => {
    res.render('pages/signin');
})

router.get('/signup', (req, res) => {
    res.render('pages/signup');
})

router.get('/logout', (req, res) => {
    req.session.isLoggedIn = false;
    res.redirect('/');
})

router.post('/login', async (req,res) => {
    const email_ = req.body.email;
    const password_ = req.body.password;

    datas = await User.find();
    await datas.forEach((data) => {
        if (email_ == data.email) {
            if (password_ == data.password) {
                req.session.isLoggedIn = true;
                res.redirect('/');
            }
            else {
                res.render('pages/signin', {error: 'Incorrect Password'})
            }
        }
    });
    res.render('pages/signin', {error: 'Incorrect email or password'});
})

router.post('/register', async (req, res) => {
    const name_ = req.body.name;
    const email_ = req.body.email;
    //console.log(email_, name_)
    //check if email exist
    datas = await User.find();
    await datas.forEach((data) => {
        if (email_ == data.email) {
            res.render('pages/signup', {error: 'This Email has been registered'})
        }
    })
    var password = req.body.password;
    const password_ = req.body.password_;
    if (password != password_) {
        res.render('pages/signup', {error: 'Incorrect Password'})
    }
    else {
        const user = new User({
            name: name_,
            email: email_,
            password: password_
        });
        await user.save((err, res) => {
            if (err) console.error(err);
            else {
                console.log('Sign In Succesful!')
            }
        }) 
        req.session.isLoggedIn = true;
    
        res.redirect('/');
    }
})

module.exports = router;