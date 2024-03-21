const express = require('express');
const dotenv = require("dotenv").config({path: '.env'});
const cors = require('cors');
const authRoute=require('./Routes/AuthRoute.js');
const app = express();

app.use(cors({
    credentials:true,
}));

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use("/",authRoute);
app.listen("3601", "0.0.0.0", () => {
    console.log("Server running on port 3500");
});