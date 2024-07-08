const mongoose=require("mongoose");



const ownerSchema=mongoose.Schema({

    fullName:String,
    email:String,
    password :String,
    cart :[],     //one way of defining array
    isAdmin: Boolean,
    products:{       
  type:Array,     //second  way of defining array       
  default:[]
    },
    gstn:String,
    picture:String
})

module.exports=mongoose.model("owner",ownerSchema);