const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const app = express();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'frontend/views'));

// Static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'frontend')));
app.use(express.static(__dirname)); // for styles.css in root

// Simulated login session (for testing user-based navbar)
app.use((req, res, next) => {
    res.locals.user = null; // Set to { name: 'admin' } if you want to simulate login
    next();
});

/* ---------------------- FRONTEND ROUTES ---------------------- */

// Homepage
app.get('/', (req, res) => {
    res.render('home');
});

// About
app.get('/about', (req, res) => {
    res.render('about');
});

// Contact
app.get('/contact', (req, res) => {
    res.render('contact');
});

// Login page
app.get('/login', (req, res) => {
    res.render('login');
});

// not actual login, change so it's not hardcoded and publicly viewable, probably best to write query to reference DB
// Login process
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'password123') {
        res.locals.user = { username };
        res.render('home', { user: username, auth: true });
    } else {
        res.render('login', { error: 'Invalid username or password' });
    }
});

// Bookings views
app.get('/bookings/guest', (req, res) => {
    res.render('bookings/bookingsGuest');
});

app.get('/bookings/dashboard', (req, res) => {
    res.render('bookings/bookingsDash');
});

app.get('/bookings/requests', (req, res) => {
    res.render('bookings/bookingsRequest');
});

// Specialties
app.get('/specialties/foreclosure', (req, res) => {
    res.render('specialties/foreclosure');
});
app.get('/specialties/general', (req, res) => {
    res.render('specialties/general');
});
app.get('/specialties/probate', (req, res) => {
    res.render('specialties/probate');
});
app.get('/specialties/realEstate', (req, res) => {
    res.render('specialties/realEstate');
});

/* ---------------------- BACKEND-API ROUTES (Flask) ---------------------- */

//CRUDS

/* ---------------------- SERVER START ---------------------- */

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
