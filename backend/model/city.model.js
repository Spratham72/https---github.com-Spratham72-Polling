const mongoose=require ('mongoose');
const CitySchema=new mongoose.Schema({
    name:{type:String},
    district:{type:String},
    cityImage:{type:String},
    dictrictImage:{type:String},
    polling:{type:Number},
    type:{type:String},
    population:{type:Number}
});
const city=mongoose.model("city",CitySchema);
module.exports=city;