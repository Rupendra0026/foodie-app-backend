// add to cart
//del item from cart
// add product
// del product


const express=require("express");
const app=express();
const path=require("path");
const multer=require("multer");
const addtocart=require('../models/Daddtocart');
const productschema=require('../models/Addpro');
const orders=require('../models/Orders');
const bodyparser=require("body-parser");
app.use('/images', express.static('images'));
// app.use(bodyparser.urlencoded({extended:true,parameterLimit:100000,limit:"500mb"}));

// app.use(bodyparser.json());
// app.use(express.json());

const Contact=require('../models/contact');

const contactform=async(req,res)=>{
    const data=await req.body.contact;
    console.log(data);
    // res.json({data:data.name});
    const data11=new Contact({name:data.name,email:data.email,subject:data.subject,desc:data.desc});
    try{
        data11.save();
        res.send({msg:"Your response has been saved"});

    }
    catch(err){
        res.send({msg:"Failed to save"});
    }
    
}

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

const delitem_cart=async(req,res)=>{
    const data=await req.body;
    const delitem=await addtocart.findOneAndDelete({_id:data.productid,userid:data.userid}).then(async(result)=>{
        console.log(result);
        if(result){
            // console.log("item deleted");
            const cartitems=await addtocart.find({userid:data.userid});
            res.send({status:200,msg:"item deleted",cartitems:cartitems});
        }
        else{
            res.send({msg:"failed to delete"})
        }
    })
}







const addproduct=async(req,res)=>{
        const imgfile=await req.file;
        const datax=req.body;
        const nrr=await req.body.name;
        console.log(datax.data);
        console.log(imgfile);
    const addpro=await new productschema({product_name:datax.name,product_price:datax.price,product_category:datax.cag,imgurl:req.file.path,desc:datax.des});
    try{
        addpro.save().then(async()=>{
        const data=await productschema.find();
        res.json({status:200,msg:"product added",productlist:data});
        console.log("product added");
        });
        
    }
    catch(err){
        res.json({msg:"failed to add product"});
        console.log("failed to add");
    }
}

const del_product=async(req,res,id)=>{
    const val=await req.params.id;
    console.log(val);
    try{
        const delitem=await productschema.findByIdAndDelete({_id:val});
        const data=await productschema.find();
        console.log(data);
        res.send({msg:"item deleted",productslist:data});
        
    }
    catch(err){
        res.send({msg:"failed to delete"});
    }
}

const placeorder=async(req,res)=>{
    const {cart,user,ord,totalprice}=await req.body;
    // console.log(cart)l
    const{name,contact,pincode,address}=ord;
    const data=await new orders({
        userid:user._id,
        name:name,
        contact:contact,
        pincode:pincode,
        address:address,
        products:cart,
        totalprice:totalprice
    });
    try{
        data.save();
        const datax=await orders.find({userid:user._id});
        console.log(datax);
        cart.forEach(async(e)=>{
            try{
                const delitem=await addtocart.findOneAndDelete({_id:e._id,userid:e.userid});
               
            }
            catch(err){
                console.log(err);
            }
        })
        const cartdata=await addtocart.find({userid:user._id});
        console.log(cartdata);
        res.send({status:200,msg:"order placed",orderslist:datax,cart:cartdata});
        console.log("placed order");
        
    }
    catch(err){
        console.log(err);
        res.send({status:400,msg:"unable to place order"});
    }
}

const updatestatus=async(req,res,id)=>{
    const orderid=await req.params.id;
    const change=await orders.findOneAndUpdate({_id:orderid},{
        $set:{
            delivery:true
        }
    });
    try{
        change.save();
        res.send({status:200,msg:"status update",data:req.adminorders});
        console.log("data updated");
    }
    catch(err){
        res.send({msg:"failed to update"});
        console.log(err);
    }
}
const Allproducts=async(req,res)=>{
    const data=await addpro.find();
    res.send({data:data});
}
const adminorders=async(req,res)=>{
    res.send({data:req.adminorders});
}

const userorders=async(req,res)=>{
    const userid=await req.clientdata;
    const data=await orders.find({userid:userid._id});
    // console.log(data);
    res.send({userorders:data});
}
module.exports={itemtocart,
    delitem_cart,addproduct,placeorder,userorders,del_product,
    adminorders,Allproducts,contactform,updatestatus};