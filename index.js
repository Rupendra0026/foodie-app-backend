const express=require("express");
const mongoose=require("mongoose");
const app=express();
app.use(express.json());
const cors=require("cors");
app.use(cors());
const cookieparser=require("cookie-parser")
app.use(cookieparser());
const router=require('./serverroutes/Serverroutes');
app.use(router);
//mongoose connection
mongoose.connect('mongodb+srv://clientproject:clientproject@cluster0.qgegzxd.mongodb.net/',({useNewUrlParser:true,useUnifiedTopology: true})).then(()=>{
    console.log("connectedtodb");
})


app.listen(5000,()=>{
    console.log("server running");
})