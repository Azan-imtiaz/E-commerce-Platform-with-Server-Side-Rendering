
const express = require("express");

const router = express.Router();
const ownerModel = require("../models/ownerModel");

if (process.env.NODE_ENV === "development") {
    router.get("/create",async  (req, res) => {
        let owners=await ownerModel.find();
        if(owners.length > 0){
            return res.status( 500).send("You dont have permision to create a new owner")
        }
   let {fullname,email,password}=req.body;


   let createdOwner= await ownerModel.create({
            fullname,email,password
        });

        

        return res.status(201).send(createdOwner)
     })
}

router.get("/admin",function(req,res){
  const success=req.flash("success");
  console.log(success) 
  res.render("createProducts",{success:success})

})

module.exports = router;