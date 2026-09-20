/*const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const postsRoute = require('./routes/posts'); // Import the routes
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const DB_CONNECTION = "mongodb://localhost:27017//";


app.use(cors());
app.use(bodyParser.json());
app.use('/posts', postsRoute); // Use the imported routes

// MongoDB connection
mongoose.connect(DB_CONNECTION)  //{ useNewUrlParser: true, useUnifiedTopology: true }
    .then(() => console.log('Connected to database'))
    .catch((error) => console.log(error));

app.get('/', (req, res) => {
    res.send('Hello, MERN!');

});

app.get('/index.html', function (req, res) {
   
    res.sendFile('client/index.html', { root: __dirname });
   

});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});*/
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const userRoutes = require("../routes/userRoutes");


dotenv.config();

connectDB();

const app = express();

app.use(cors());
//app.use(express.json());
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "MERN backend is running!"
    });
});

const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
