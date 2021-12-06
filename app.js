const express = require('express');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const passport = require('passport');
const Helper = require('./Schema/Helper');
const LocalStrategy = require('passport-local');
const User = require('./Schema/User');
const path = require('path');
const flash = require('express-flash');
const { findHelpers } = require('./findHelpers');
const { locations, typesOfWork } = require('./Seeds/data.js');
const session = require('express-session');
require('dotenv').config();

const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + (1000 * 60 * 60 * 24 * 7),
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}


const app = express();
const port = process.env.PORT || 3000;

app.engine('ejs', ejsMate);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session(sessionConfig));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

mongoose.connect('mongodb://localhost:27017/domestic-helpers-portal', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected!');
});

app.use(flash());

app.get('/', async (req, res) => {
    const helpers = await Helper.find({});
    res.render('form', { locations, typesOfWork });
})

app.get('/home', async (req, res) => {
    res.render('home');
})

app.get('/signup', (req, res) => {
    console.log(req.session);
    res.render('signup', { message: req.session.error || '' });
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/logout', (req, res) => {
    req.logout();
    delete req.session.user;
    console.log(req.session);
    res.redirect('/login');
})

app.post('/helpers', async (req, res) => {
    const { helper: desiredHelper } = req.body;
    const helpers = await Helper.find({});
    const requiredHelpers = findHelpers(helpers, desiredHelper);
    console.log(requiredHelpers);
    res.render('required-helpers', { requiredHelpers });
})

app.post('/signup', async (req, res) => {
    //console.log(req.body);
    const { username, password } = req.body;
    if (username && password) {
        try {
            const user = new User({ username });
            const newUser = await User.register(user, password);
            req.session.user = username;
            delete req.session.error;
            res.redirect('/home');
        }
        catch (e) {
            req.session.error = e.message;
            res.redirect('/signup');
        }
    }
    else {
        req.session.error = 'Username or password missing';
        res.redirect('/signup');
    }
})

app.post('/login', passport.authenticate('local', { failureFlash: 'Incorrect username or password!', failureRedirect: '/login' }), (req, res) => {
    const { username } = req.body;
    res.render('home', { username });
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
})