const express = require('express');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const Helper = require('./Schema/Helper');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.engine('ejs', ejsMate);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/domestic-helpers-portal', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected!');
});

app.get('/', async (req, res) => {
    const helpers = await Helper.find({});
    res.render('form', { locations, typesOfWork });
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
})