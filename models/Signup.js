const mongoose=require("mongoose");
const validator=require("validator");
const jwt=require("jsonwebtoken");

const Myschema=new mongoose.Schema({
    
    Gmail:{
        type:"String",
        required:[true,"Gmail is required"],
        validate:[validator.isEmail,"gmail is invalid"],
        lowercase:true
    },
    Password:{
        type:"String",
        min:[6,"Min length has to be 6"],
        required:[true,"Password is required"],
    },
    Date:{
        type:"Date",
        default:Date()
    },
    tokens:[
        {
            passkey:{
                type:"String"
            }
        }
    ],
    user:{
        type:Boolean,
        default:false
    }
});

Myschema.methods.generatelogtoken=async function(){
    try{
        let token=await jwt.sign({_id:this._id},"trail");
        if(this.tokens){
            this.tokens.pop();
        }
        this.tokens=await this.tokens.concat({passkey:token});
        await this.save();
        return token;


    }catch(err){
        console.log("rupendra rupendra")
        console.log(err);

    }
}

const Register_user= mongoose.model("Registered_users",Myschema);

module.exports=Register_user;
