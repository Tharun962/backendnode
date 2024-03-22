const express = require('express');
const dotenv = require("dotenv").config({path: 'config.env'});
const cors = require('cors');
const authRoute=require('./Routes/AuthRoute.js');
const connectDb=require('./Database/Database.js');
const app = express();
const cookieParser=require('cookie-parser');

app.use(cors({
    credentials:true,
    origin:"https://frontendreact-a17m.onrender.com"
}));

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use("/",authRoute);

connectDb();

app.listen(process.env.PORT, "0.0.0.0", () => {
    console.log(`Server running on port: ${process.env.PORT}`);
});