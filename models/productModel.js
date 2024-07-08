const mongoose=require("mongoose");


const prudoctSchema=mongoose.Schema({
    image:Buffer,
    name:String,
    price:Number,
    discount:{
        type:Number,
        default:0
    },
    bgcolor:String,
    panelcolor:String,
    textcolor:String
});


const productModel=mongoose.model("product",prudoctSchema);

module.exports=productModel;