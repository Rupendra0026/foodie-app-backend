const mongoose=require("mongoose");

const orderdata=mongoose.Schema({
    userid:{
        type:"String"
    },
    name:{
        type:"String",
    },
    contact:{
        type:"Number"
    },
    pincode:{
        type:"Number"
    },
    address:{
        type:"String"
    },
    products:{
        type:Array
    },
    totalprice:{
        type:"Number"
    },
    delivery:{
        type:Boolean,
        default:false
    }
});

const orders=mongoose.model("orders",orderdata);

module.exports=orders;