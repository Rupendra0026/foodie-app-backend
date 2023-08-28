const express=require("express");
const app=express();
app.use(express.json());
const cookieparser=require("cookie-parser")
app.use(cookieparser());
const jwt=require("jsonwebtoken"); 
//model
const Register=require('../models/Signup');
const addtocart=require('../models/Daddtocart');
const addpro=require('../models/Addpro');
const orders=require('../models/Orders');
const Maincheck=async(req,res,next)=>{
    const token=await req.cookies.checktok;
    if(token){
        const verify= jwt.verify(token,"trail");
        const clientdata=await Register.findOne({_id:verify._id}).select('Name Gmail Contact user');
        console.log(clientdata);
        const userorders=await orders.find({userid:verify._id});
        const cartlist=await addtocart.find({userid:verify._id});
        const productslist=await addpro.find();
        req.productslist=productslist;
        req.userorders=userorders;
        req.cartlist=cartlist;
        req.clientdata=clientdata;
        if(clientdata.user){
            req.adminorders=await orders.find();
        }
        console.log("checking")
    next();
    }
    else{
        console.log("unauthorised access");
        res.send({msg:"unauthorised access"});
    }
}

module.exports=Maincheck;