const express=require("express");
const userModel = require("../models/userModel");
const  router=express.Router();

router.get("/",function(req,res){
    const error = "Some error message"; // Example error message
    res.render('index', { error });
})



module.exports=router;