const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://azanimtiaz43:T9uv2ixNE79tvHFX@cluster0.vfvefyj.mongodb.net/BackendProjectMern?retryWrites=true&w=majority");

const userSchema=mongoose.Schema({

    fullName:String,
    email:String,
    password :String,
    cart :[],     //one way of defining array
    isAdmin: Boolean,
    orders:{       
  type:Array,     //second  way of defining array       
  default:[]
    },
    contact:Number,
    picture:String
})

module.exports=mongoose.model("user",userSchema);