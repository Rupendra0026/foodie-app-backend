const express=require("express");
const bcrypt=require("bcrypt");
const app=express();

app.use(express.json());
const cookieparser=require("cookie-parser");
app.use(cookieparser());
const jwt=require("jsonwebtoken");

const Register=require('../models/Signup');
const addtocart=require('../models/Daddtocart');
const orders=require('../models/Orders');
const productschema=require('../models/Addpro');
//controllers 
//registeruser
const Register_user=async(req,res)=>{
    const getdata=await req.body;
    const{gmail,password,}=getdata;
    const check_gmail=await Register.findOne({Gmail:gmail});
        if(check_gmail){
            res.send({msg:"Gmail already exists"});
        }
        else{
            const hashpass=await bcrypt.hash(password,10);
            const user_data=new Register({Gmail:gmail,Password:hashpass});
                user_data.save()
                .then((result)=>{
                    if(result){
                        res.send({status:200,msg:"Registered successfully"});
                    }
                    else{
                        res.send({msg:"Failed to register"});
                    }
                })
                .catch(err=>{
                    res.send({msg:"Enter valid details"});
                })
            
        }
}

//loginuser
const Login_user=async(req,res)=>{
    const logdata=await req.body;
    const {gmail,password}=logdata;
    const checklog=await Register.findOne({Gmail:gmail});
    if(checklog){
        const passcheck=await bcrypt.compare(password,checklog.Password);
        if(passcheck){
            const token=await checklog.generatelogtoken();
            if(token){
                res.cookie('checktok',token,{httpOnly:true,expire:360000+Date.now()});
                const clientdata=await Register.findOne({Gmail:gmail}).select('Gmail user');
                // console.log(clientdata);
                const cartlist=await addtocart.find({userid:clientdata._id});
                const userorders=await orders.find({userid:clientdata._id});
                // console.log(userorders);
                res.send({msg:"Logged in",status:200,user:true,userdata:clientdata,cartlist:cartlist,userorders:userorders});
            }
            else{
                res.send({msg:"unable to login"});
            }
        }
        else{
            res.send({msg:"Invalid credentials"});
        }
    }
    else{
        res.send({msg:"User doesnt exists"});
    }

}

//logout
const Logout=async(req,res)=>{
    const x=res.clearCookie("checktok");
    if(x){
        res.send({status:200,msg:"Logged out",user:false});
    }
    else{
        res.send({msg:"Unable to logout"});
    }
}


// check user status
const check=async(req,res)=>{
    console.log(req.clientdata);
    console.log(req.cartlist);
    console.log(req.userorders);
    const allproducts=await  productschema.find();
    res.send({status:200,user:true,clientdata:req.clientdata,cartdata:req.cartlist,userorders:req.userorders,productslist:req.productslist,allproducts:allproducts});
}

module.exports={Logout,Login_user,Register_user,check};