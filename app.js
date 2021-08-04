const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require("./config/db");

const { MONGODB } = require('./config');
const userRoutes = require('./routes/user');
const restRoutes = require('./routes/restaurant');
const Tokens = require('./models/token');

const auth = require('./middleware/auth');

// Connect to MongoDB
connectDB();

app.use(express.json());

// Check for expired jwt token
app.use( async function (req, res, next) {
    console.log('USER API CALLED');
    if(req.headers.authorization){
        const tok =  await Tokens.findOne({ token: req.headers.authorization });
        console.log(tok);
        if(tok)
            return res.status(403).json({ error: { message: 'invalid/expired token' } });
    }
    next();
});


app.use('/api/users', userRoutes);
app.use('/api/restaurant',auth, restRoutes);

//error handlers
app.use((req, res, next) => {
    const err = new Error('not found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({ error: { message: err.message } });
    next(); 
});

//listen to port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on  ${PORT}`));