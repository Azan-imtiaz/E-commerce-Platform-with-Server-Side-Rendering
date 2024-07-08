const express=require("express");
const userModel = require("../models/userModel");
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const  router=express.Router();

router.get("/",function(req,res){
    const error=req.flash("error");
    console.log(error);

    res.render('index', { error:error ,successMessage:null});
})

router.get("/shop",isLoggedIn,function(req,res){
    res.render("shop");
})


module.exports=router;