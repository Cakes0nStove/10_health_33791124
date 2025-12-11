// Import express and ejs
var express = require ('express')
var session = require ('express-session')
const expressSanitizer = require('express-sanitizer');
var ejs = require('ejs')
var mysql = require('mysql2');
const path = require('path')
require('dotenv').config();

// Create the express application object
const app = express()
const port = 8000

// Tell Express that we want to use EJS as the templating engine
app.set('view engine', 'ejs')
app.use(express.json());
// Set up the body parser 
app.use(express.urlencoded({ extended: true }))

app.use(expressSanitizer());
// Set up public folder (for css and static js)
app.use(express.static(path.join(__dirname, 'public')))
//create a session
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(session({
    secret: 'somerandomstuff',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}))

// Define our application-specific data
app.locals.shopData = {shopName: "VitaCore"}

// Define the database connection pool
const db = mysql.createPool({
    host: process.env.HEALTH_HOST,
    user: process.env.HEALTH_USER,
    password: process.env.HEALTH_PASSWORD,
    database: process.env.HEALTH_DATABASE,
    waitForConnections:true,
    connectionLimit: 10,
    queueLimit: 0
});

global.db = db;

// Load the route handlers
const mainRoutes = require("./routes/main")

app.use('/', mainRoutes)

// Load the route handlers for /users
const usersRoutes = require('./routes/users')
app.use('/users', usersRoutes)

// Load the route handlers for /vitamins
const vitaminsRoutes = require('./routes/vitamins')
app.use('/vitamins', vitaminsRoutes)


// Load the route handlers for /shop
const shopRoutes = require('./routes/shop')
app.use('/shop', shopRoutes)


// Start the web app listening
app.listen(port, () => console.log(`Example app listening on port ${port}!`))