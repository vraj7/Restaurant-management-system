const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require("./config/db");

const { MONGODB } = require('./config');
const userRoutes = require('./routes/user');
const restRoutes = require('./routes/restaurant');

const auth = require('./middleware/auth');
// Connect to MongoDB
connectDB();
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

//app.use(cors());


app.use('/api/users', userRoutes);
app.use('/api/restaurant',auth, restRoutes);


app.use((req, res, next) => {
    const err = new Error('not found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({ error: { message: err.message } });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on  ${PORT}`));