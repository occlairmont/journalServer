const router = require('express').Router();
const User = require('../db').import('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//Create a new endpoint : /create
//The endpoint is going to be a post request
//Have an object that matches the model of UserTable (email/password)
//Let sequelize create a new record in the database (create)

/* *************
***** USER SIGNUP *****
************************ */
router.post('/create', function (req, res) {
    let userModel = {
        email: req.body.user.email,
        password: bcrypt.hashSync(req.body.user.password, 13)
    };
    User.create(userModel)
        .then(function (user) {
            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
            let responseObject = {
                user: user,
                message: 'User successfully created!',
                sessionToken: token
            };
            res.json(responseObject);
        })
        .catch(function (err) {
            res.status(500).json({ error: err })
        });
});

// Login challenge

router.post('/login', function (req, res) {
    User.findOne({
        where: {
            email: req.body.user.email,
        }
    })
        .then(function loginSuccess(user) {
            if (user) {
                bcrypt.compare(req.body.user.password, user.password, function (err, matches) {
                    if (matches) {
                        
                        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });

                        res.status(200).json({
                            user: user,
                            message: 'User successfully logged in!',
                            sessionToken: token
                        })

                    } else {
                        res.status(502).send({ error: "Login Failed"});
                    }
                });
            } else {
                res.status(500).json({ error: 'User does not exist.' })
            };
        })
        .catch(function (err) {
            res.status(500).json({ error: err })
        })
});
router.put("/login", function (req, res){
    res.send('Hello from login');
})
module.exports = router;