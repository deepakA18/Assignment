const express = require('express');
const app = express();

const connect = require('./db/conn');

const users = require('./routes/users')

require('dotenv').config({path: '.env'})
const PORT = process.env.PORT;


app.use(express.json());
app.use('/api/v1/user',users);

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