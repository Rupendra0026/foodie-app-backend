const mongoose=require("mongoose");

const addtocart=mongoose.Schema({
    name:{
        type:"String",
    },
    cat:{
        type:"String",
    },
    price:{
        type:"Number",
    },
    imgurl:{
        type:"String"
    },
    userid:{
        type:"String"
    }
}) ;

const cartitems=mongoose.model("Dcartitems",addtocart);

module.exports=cartitems;