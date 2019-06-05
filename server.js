const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');

// init app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

// Routes
app.use('/api/auth', require('./router/api/auth'));

// DB connection
const db = config.MONGODB_URI;

mongoose.connect(db, {
        useNewUrlParser: true
    }).then(() => console.log('MongoDB Connected..'))
    .catch(err > console.log(err));

// App Port
const PORT = config.PORT;

// Run Server
app.listen(PORT, console.log(`Server started on ${PORT}`));