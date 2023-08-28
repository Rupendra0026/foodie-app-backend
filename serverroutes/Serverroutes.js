const express=require("express");
const app=express();
const router=express.Router();
router.use(express.json());
app.use(express.json());
// router.use(bodyparser.json());
const multer=require("multer");
const path=require("path");
//importing the controllers
app.use('/images', express.static('images'));

const {Register_user,Login_user, Logout,check}=require("../controllers/Authroutes");
const Maincheck = require("../middleware/middlewarecheck");
const { itemtocart,delitem_cart ,addproduct,
    placeorder, userorders,del_product,adminorders,
    contactform,updatestatus} = require("../controllers/Productroute");


router.get('/',(req,res)=>{
    res.send("router working finr");
})

router.post('/registeruser',Register_user);
router.post('/login',Login_user);
router.get('/logout',Logout);

router.get('/check',Maincheck,check)
router.post('/addtocart',Maincheck,itemtocart);
router.post('/delcartitem',Maincheck,delitem_cart);
// router.post('/addproduct',Maincheck,addproduct);

router.post('/placeorder',Maincheck,placeorder);
router.get('/userorders',Maincheck,userorders);
const upload=multer({dest:"images"});
router.post('/addproduct',[upload.single('image'),Maincheck],addproduct);
router.get('/del_product/:id',Maincheck,del_product);
router.get('/adminorders',Maincheck,adminorders);
router.post('/contactform',contactform);
router.get('/updatestatus/:id',Maincheck,updatestatus);
module.exports=router;