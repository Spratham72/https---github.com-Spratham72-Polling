
const express=require('express');
const city = require('../model/city.model');
const router=express.Router();
router.get('/',async(req,res)=>{

    try {
        
        console.log(Number(req.query.page))
        const City=await city.find().skip((Number(req.query.page)-1)*5).limit(5);
        res.status(200).json({City});
    } catch (error) {
        res.status(400).json({error})
    }
})
router.post('/',async(req,res)=>{
    try {
        const City=await city.create(req.body);
        res.status(201).json({City});
    } catch (error) {
        res.status(401).json({error})
    }
})
router.get('/filter/:value',async(req,res)=>{
    try {
        const data=await city.find({type:req.params.value});
        res.status(200).json({data})
    } catch (error) {
        res.status(401).json({error})
    }
    
})
router.get('/search/:str',async(req,res)=>{
    try {
        
        const val=await city.find({name:req.params.str});
       
        res.status(200).json({val})
    } catch (error) {
        res.status(401).json({error})
    }
    
})
module.exports=router;