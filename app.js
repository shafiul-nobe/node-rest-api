const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const feedRoutes = require("./routes/feed");
const authRoutes = require("./routes/auth");

const app = express();

//app.use(bodyParser.urlencoded);
app.use(bodyParser.json());
app.use('/image',express.static(path.join(__dirname,'images')));

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
    next();
})


app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);
app.use((error,req,res,next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message : message,data: data});
}) 

mongoose.connect('mongodb+srv://shafiul-nobe:01737523752md@node-rest-api.bobrbjz.mongodb.net/?retryWrites=true&w=majority').then(result =>{
    app.listen(8080);
})
