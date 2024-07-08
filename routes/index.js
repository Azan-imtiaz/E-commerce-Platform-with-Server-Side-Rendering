const express=require("express");
const userModel = require("../models/userModel");
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const productModel = require("../models/productModel");
const  router=express.Router();

router.get("/",function(req,res){
    let error=req.flash("error");
    

    if(error.length == 0){
        error=null;
    }

    res.render('index', { error:error ,successMessage:null,loggedIn:false});
})

// router.get("/shop",isLoggedIn,async function(req,res){
//     const products=await productModel.find();
//     res.render("shop",{products});
// })
router.get('/shop', isLoggedIn, async (req, res) => {
    try {
   
       let message=req.flash("successMessage");
        // Fetch all fields for products
       
        const products = await productModel.find({}).lean(); // Use lean() for better performance
        res.render('shop', { products,successMessage:message });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get("/addToCart/:productid",isLoggedIn,async (req,res)=>{
    let user= await userModel.findOne({email:req.user.email});

    user.cart.push(req.params.productid);
    await user.save();
    req.flash("successMessage","Added to cart");
    res.redirect("/shop");
})

router.get("/cart",isLoggedIn,async (req,res)=>{
   let user= await userModel.findOne({email:req.user.email}).populate("cart");
  
   res.render("cart");
})
module.exports=router;