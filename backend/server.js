require('dotenv').config(); // Load environment variables from .env file into process.env
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// app.use(bodyParser.json());
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const workoutsRouter = require('./routes/workouts');

app.use('/api/workouts', workoutsRouter);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB!');
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB: \n', error.message);
    });
app.listen(process.env.PORT, () => {
    console.log('Server is running on port 3000!');
});
