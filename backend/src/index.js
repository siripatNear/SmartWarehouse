const express = require('express');
const app = express();
const { PORT, CLIENT_URL } = require('./constants');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const cors = require('cors');

//import passport middleware
require('./middlewares/passport-middleware')

//initialize middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(passport.initialize());

//import routes from
const authRoutes = require('./routes/auth');

//initialize routes
app.use('/api', authRoutes)

//app start
const appStart = () => {
    try {
        app.listen(PORT, ()=>{
            console.log(`Server port: ${PORT} started successfully`);
        })
    }catch (err) {
        console.log(`Error: ${err.message}`);
    }
}

appStart();