const mongoose=require ('mongoose');
const BoothSchema=new mongoose.Schema({
    name:{type:String},
    stations:{type:Array}
});
const booth=mongoose.model("booth",BoothSchema);
module.exports=booth;