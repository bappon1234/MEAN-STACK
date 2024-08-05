const express = require("express");
const app = express();
const db =require('./db/database.js');
const User = require("./model/user.js");

const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

const users = require('./Routes/routes.js');
app.use('/users', users);

app.listen(PORT,()=>{
    console.log(`port connected ${PORT}`);
});