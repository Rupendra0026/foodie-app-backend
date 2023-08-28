const mongoose=require("mongoose");


const proschema=mongoose.Schema({
    product_name:{
        type:"String",
        required:[true,"product name is required"]
    },
    product_price:{
        type:"Number",
        required:[true,"product price is required"]
    },
    product_category:{
        type:"String",
        required:[true,"product category is required"]
    },
    imgurl:{
        type:"String",
        required:[true,"img url is required"]
    },
    desc:{
        type:"String",
    }
});


const productschema=mongoose.model("product_schema",proschema);

module.exports=productschema;