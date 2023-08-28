const mongoose=require("mongoose");

const contact=new mongoose.Schema({
    name:{
        type:"String"
    },
    email:{
        type:"String"
    },
    subject:{
        type:"String"
    },
    desc:{
        type:"String"
    }
});

const contactform=mongoose.model("contactform",contact);

module.exports=contactform;