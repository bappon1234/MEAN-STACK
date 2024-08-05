const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/angular-login",{
})
.then(()=>{
    console.log("mongodb connected");
}).catch((e)=>{
    console.log("not connected");
});