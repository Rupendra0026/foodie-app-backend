// add to cart
//del item from cart
// add product
// del product


const express=require("express");
const app=express();
app.use(express.json());

const addtocart=require('../models/Daddtocart');

const itemtocart=async(req,res)=>{
    const data=await req.body.data;
    const userid=await req.body.userid;
    // console.log(userid);
    // console.log(data);
    const newitem=await new  addtocart({name:data.name,cat:data.cat,price:data.price,imgurl:data.url,userid:userid});
    
    newitem.save()
    .then(async(resu,err)=>{
        if(resu){
            const mycart=await addtocart.find({userid:userid});
            res.send({msg:"item added to cart",status:200,cartlist:mycart});
        }
        else{
            console.log({msg:"unable to add",status:400});
        }
    });
    
}

module.exports={itemtocart}