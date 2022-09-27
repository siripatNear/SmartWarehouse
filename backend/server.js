const express = require('express');
const Quote = require('inspirational-quotes');

const app = express();
const port = 5000;
//Allow frontend to reach backend [was blocked by core]
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
})

app.get('/',(req, res) => {
    res.json({"users": ["userOne","userTwo","userThree"]});
})

app.listen(port, ()=>{
    console.log('Server started successfully');
})