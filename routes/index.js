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
        const startTime = Date.now();
        
        // Fetch all fields for products
        const products = await productModel.find({}).lean(); // Use lean() for better performance
        res.render('shop', { products });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Internal Server Error');
    }
});
module.exports=router;