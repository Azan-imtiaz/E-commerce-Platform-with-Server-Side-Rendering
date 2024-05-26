const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://azanimtiaz43:T9uv2ixNE79tvHFX@cluster0.vfvefyj.mongodb.net/BackendProjectMern?retryWrites=true&w=majority")
.then(()=>{
    console.log("Connected to Mongodb");
}).catch((err)=>{
    console.log(`Error in connected to database : ${err}`);
})


module.exports=mongoose.connection;
