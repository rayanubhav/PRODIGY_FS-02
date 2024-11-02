const express=require('express');
const Department=require('./models/Department');

const db=require('./db');

const router=express.Router();

router.get('/',async(request,response)=>{
    try {
        const department=await Department.find();
        response.status(200).json(department);
    } catch (error) {
        response.status(500).json(error);
    }
})

router.get('/:id',async (request,response)=>{
    try {
        const department=await Department.findById(request.params.id);
        response.status(200).json(department);
    } catch (error) {
        response.status(500).json(error);
    }
})

router.post('/',async (request,response)=>{
    try {
        const department=new Department(request.body);
        await department.save();
        response.status(200).json(department);
    } catch (error) {
        response(500).json(error);
    }
})

router.put('/:id',async (request,response)=>{
    try {
        const department=await Department.findByIdAndUpdate(request.params.id,request.body,{new:true});
        response.status(200).json(department);
    } catch (error) {
        response.status(500).json(error);
    }
  
})

router.delete('/:id',async (request,response)=>{
    try {
        const department=await Department.findByIdAndDelete(request.params.id);
        response.status(200).json(department);
    } catch (error) {
        response.status(500).json(error);
    }
})

module.exports=router;