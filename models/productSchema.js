const mongoose=require("mongoose");


const prudoctSchema=mongoose.Schema({
    image:String,
    name:String,
    price:Number,
    discount:{
        type:Number,
        default:0
    },
    bgColor:String,
    panelColor:String,
    textColor:String
});


const product=mongoose.model("product",prudoctSchema);

module.exports=product;