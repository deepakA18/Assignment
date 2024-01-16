const express = require('express');
const app = express();

const connect = require('./db/conn');


require('dotenv').config({path: '.env'})
const PORT = 8000;


const connection =  async () => {
    try {
        await connect(process.env.URL);
        app.listen(PORT,() => {
        console.log(`server is listening on port ${PORT}`)
    })
    } catch (error){
        console.log(error);
    }
}

connection(); 