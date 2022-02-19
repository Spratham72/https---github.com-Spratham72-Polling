
const express=require('express');
const booth = require('../model/booth.model');
const router=express.Router();
router.get('/',async(req,res)=>{
    try {
        const Booth=await booth.find().lean().exec();
        res.status(200).json({Booth});
    } catch (error) {
        res.status(400).json({error})
    }
})
router.post('/',async(req,res)=>{
    try {
        const Booth=await booth.create(req.body);
        res.status(201).json({Booth});
    } catch (error) {
        res.status(401).json({error})
    }
})
router.get('/',async(req,res)=>{
    try {
        const Booth=await booth.find();
        res.status(201).json({Booth});
    } catch (error) {
        res.status(401).json({error})
    }
})
module.exports=router;