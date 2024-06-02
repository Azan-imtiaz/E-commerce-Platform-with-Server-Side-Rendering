const mongoose=require("mongoose");
const dbgr=require("debug")("development:mongoose");
const config=require("config");   //package

mongoose.connect(`${config.get("MONGODB_URL")}`)
.then(()=>{
    dbgr("Connected to Mongodb");
}).catch((err)=>{
    console.log(`Error in connected to database : ${err}`);
})


module.exports=mongoose.connection;
