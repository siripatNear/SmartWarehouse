const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;

//middle ware
app.use(cors());
app.use(express.json());

//login path
app.get('/login',(req, res) => {
    res.json({"users": ["userOne","userTwo","userThree"]});
})

app.listen(port, ()=>{
    console.log('Server started successfully');
})