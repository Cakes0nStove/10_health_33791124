// Create a new router
const express = require("express")
const router = express.Router()
const bcrypt = require('bcrypt')
const multer = require('multer');
const path = require('path');
const { check, validationResult } = require('express-validator');
const saltRounds = 10;

const redirectLogin = (req, res, next) => {
    if (!req.session.userId ) {
      res.redirect('./login') // redirect to the login page
    } else { 
        next (); // move to the next middleware function
    } 
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // unique file name
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});
router.get('/register', function (req, res, next) {
    res.render('register.ejs', { errors: [] });
})

router.post('/registered',
[
    check('email').isEmail().withMessage('Please enter a valid email address'), 
    check('username').isLength({ min: 5, max: 20}).withMessage('Username must be between 5–20 characters and only letters or numbers'),
    check('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8, max: 50 }).withMessage('Password must be 8–50 characters long')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
        .matches(/[0-9]/).withMessage('Password must contain at least one number')
        .matches(/[^A-Za-z0-9]/).withMessage('Password must contain at least one special character'),    check('first').isAlpha().withMessage('First name must only contain letters'),
    check('last').isAlpha().withMessage('Last name must only contain letters'),
], 
    function (req, res, next) {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {

            return res.render('register.ejs', { errors: errors.array() });

        }
        else{


    // saving data in database
    const plainPassword = req.sanitize(req.body.password);
    
    bcrypt.hash(plainPassword, saltRounds, function(err, hashedPassword) {
    if(err){
        return next(err)
    }
        const sqlquery = "INSERT INTO users (username, first_name, last_name, email, hashed_password) VALUES (?, ?, ?, ?, ?)"
        const newUser = [
            req.sanitize(req.body.username),
            req.sanitize(req.body.first),
            req.sanitize(req.body.last),
            req.sanitize(req.body.email),
            hashedPassword
        ]

        db.query(sqlquery, newUser, function(err, result) {
            if (err) {
                return next(err)
            } else {
                result = 'Hello '+ req.sanitize(req.body.first) + ' '+ req.sanitize(req.body.last) +' you are now registered!  We will send an email to you at ' + req.sanitize(req.body.email)
                res.send(result)
            }
        })


    })
                                                                      
}}); 

router.get('/list',redirectLogin,  function (req, res, next) {
    const sqlquery = "SELECT username, first_name, last_name, email FROM users"; 
    db.query(sqlquery, function (err, result) {
        if (err) {
            next(err);
        } else {
            res.render('userlist.ejs', { users: result });
        }
    });
});

router.post('/loggedin', function (req, res, next) {
    const username = req.sanitize(req.body.username);
    const password = req.sanitize(req.body.password);
    // 1. Look up the user in the database
    const sqlquery = "SELECT * FROM users WHERE username = ?";

    db.query(sqlquery, [username], function(err, results) {
        if (err) return next(err);

        if (results.length === 0) {
            return res.send("Login failed: Username not found.");
        }

        const user = results[0];

        // 2. Compare the password with the stored hashed password
        bcrypt.compare(password, user.hashed_password, function(err, match) {
            if (err) return next(err);

            if (match) {
                req.session.userId = req.sanitize(req.body.username);
                req.session.loggedIn = true;
                req.session.username = user.username; 

                res.send("Login successful. Welcome back, " + user.first_name + "!");

            } else {
                res.send("Login failed: Incorrect password.");
            }
        });
    });
});

router.post('/upload-picture', upload.single('profilePic'), (req, res) => {
    if (!req.session.loggedIn) {
        return res.redirect('./login');
    }

    const username = req.session.username;
    const imageFile = req.file.filename;

    db.query(
        "UPDATE users SET profile_picture = ? WHERE username = ?",
        [imageFile, username],
        (err) => {
            if (err) throw err;
            return res.redirect('./login');
        }
    );
});

router.get('/logout', redirectLogin, (req,res) => {
    req.session.destroy(err => {
    if (err) {
        return res.redirect('./')
    }
    res.send('you are now logged out. <a href='+'/'+'>Home</a>');
    })
})


router.get('/login', function (req, res, next) {
    res.render('login.ejs');  // renders views/login.ejs
});


router.get('/profile', (req, res) => {
    if (!req.session.loggedIn) {
        return res.redirect('/users/login');
    }

    const username = req.session.username;

    db.query("SELECT username, email, profile_picture FROM users WHERE username = ?",
    [username], (err, results) => {
        if (err) throw err;

        const user = results[0];

        res.render('profile', {
            shopData: req.app.locals.shopData,
            user: user
        });
    });
});

// Export the router object so index.js can access it
module.exports = router
