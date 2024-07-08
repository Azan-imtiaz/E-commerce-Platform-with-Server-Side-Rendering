
 const express=require("express");
const upload =require("../config/multer-config");
const productModel=require("../models/productModel");
const router=express.Router();
router.post("/create",upload.single("image"),async (req,res)=>{
  try{
    let {name,price,discount,bgcolor,panelcolor,textcolor}=req.body;
  let product=await productModel.create({
    image:req.file.buffer,name,price,discount,bgcolor,panelcolor,textcolor
  });

    req.flash("success","Product Created Successfuly");
      res.redirect("/owners/admin");
  }catch(err){
    console.log(err.message);
    res.send("some thing went wrong");
  }
   
})



module.exports=router;