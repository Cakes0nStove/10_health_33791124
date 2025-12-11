// Create a new router
const express = require("express")
const router = express.Router()

// Handle our routes
router.get('/', (req, res) => {
    res.render('index', {
        loggedIn: req.session.loggedIn || false
    });
});

router.get('/about',function(req, res, next){
    res.render('about.ejs')
});

// Export the router object so index.js can access it
module.exports = router