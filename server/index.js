const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URL = process.env.DATABASE_URL;

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URL) 
    .then(() => {
        console.log('succesfully connected to mongodb')
    })
    .catch((error) => {
        console.log('error correction')
})

app.use('/api/posts', require('./routes/posts'));


app.get('/', (req,res) => {
    res.json({message: 'hello from the server'})
});

app.listen(PORT, () => {
    console.log('🚀 Server running on port ${PORT}')
});