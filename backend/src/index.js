const express = require('express');
const app = express();
const { PORT, CLIENT_URL } = require('./constants');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const cors = require('cors');
const { sequelize } = require('./../database/models')

//import passport middleware
require('./middlewares/passport-middleware')


//initialize middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(passport.initialize());

//import routes from
const auth = require('./routes/auth');
const user = require('./routes/user');

//initialize for auth routes
app.use('/api', auth)
app.use('/', user)

//app start
const appStart = async () => {
    try {
        app.listen(PORT, async ()=>{
            console.log(`Server port: ${PORT} started successfully`);
        })
        await sequelize.authenticate()
        console.log('Database Connected!')
    }catch (err) {
        console.log(`Error: ${err.message}`);
    }
}

appStart();