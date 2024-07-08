const express=require("express");
const userModel = require("../models/userModel");
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const productModel = require("../models/productModel");
const  router=express.Router();

router.get("/",function(req,res){
    const error=req.flash("error");
    console.log(error);

    res.render('index', { error:error ,successMessage:null});
})

router.get("/shop",isLoggedIn,async function(req,res){
    const products=await productModel.find();
    res.render("shop",{products});
})


module.exports=router;