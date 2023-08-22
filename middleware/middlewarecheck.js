const express=require("express");
const app=express();
app.use(express.json());
const cookieparser=require("cookie-parser")
app.use(cookieparser());
const jwt=require("jsonwebtoken"); 
//model
const Register=require('../models/Signup');
const addtocart=require('../models/Daddtocart');

const Maincheck=async(req,res,next)=>{
    const token=await req.cookies.checktok;
    if(token){
        const verify=await jwt.verify(token,"trail");
        const clientdata=await Register.findOne({_id:verify._id}).select('Name Gmail Contact');
        const cartlist=await addtocart.find({userid:verify._id});
        req.cartlist=cartlist;
        req.clientdata=clientdata;
        console.log("checking")
    next();
    }
    else{
        console.log("unauthorised access");
        res.send({msg:"unauthorised access"});
    }
}

module.exports=Maincheck;