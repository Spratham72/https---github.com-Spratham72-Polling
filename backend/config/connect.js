const mongoose=require ('mongoose');
const connect=async()=>{
    await mongoose.connect("mongodb+srv://pratham:city@cluster0.fsi7d.mongodb.net/polling")
}
module.exports=connect;