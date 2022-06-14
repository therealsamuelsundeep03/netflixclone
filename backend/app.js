const express = require('express');
const cors = require('cors');
require('dotenv').config()

const mongo = require('./model/mongodb');
const loginRouter = require('./routes/auth.routes');

const app = express();

(async () => {
    // middle ware
    app.use(express.json());
    app.use(cors());

    // routes
    app.use("/login",loginRouter);

    // connect to the database
    mongo.connect();
})()


app.listen(process.env.PORT,()=>{
    console.log(`server is listening at port ${process.env.PORT}`);
})