const mongoose=require("mongoose");

const userSchema=mongoose.Schema({

    fullName:String,
    email:String,
    password :String,
    cart :[        //for storing the product id
     { type:mongoose.Schema.Types.ObjectId,
      ref:"product"   }
    ],     //one way of defining array
    orders:{       
  type:Array,     //second  way of defining array       
  default:[]
    },
    contact:Number,
    picture:String
})

module.exports=mongoose.model("user",userSchema);