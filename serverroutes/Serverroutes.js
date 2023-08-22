const express=require("express");
const app=express();
const router=express.Router();
router.use(express.json());
app.use(express.json());

//importing the controllers

const {Register_user,Login_user, Logout,check}=require("../controllers/Authroutes");
const Maincheck = require("../middleware/middlewarecheck");
const { itemtocart } = require("../controllers/Productroute");


router.get('/',(req,res)=>{
    res.send("router working finr");
})

router.post('/registeruser',Register_user);
router.post('/login',Login_user);
router.get('/logout',Logout);

router.get('/check',Maincheck,check)
router.post('/addtocart',Maincheck,itemtocart);

module.exports=router;