const express=require('express');
const Employee=require('./models/Employee');
const db=require('./db');

const router=express.Router();

router.get('/',async(request,response)=>{
try {
    const employees=await Employee.find();
    response.status(200).json(employees);
} catch (error) {
    response.status(500).json(error);
}
})

router.get('/:id',async (request,response)=>{
    try {
        const employee=await Employee.findById(request.params.id);
        response.status(200).json(employee);
    } catch (error) {
        response.status(500).json(error);
    }
})

router.post('/',async (request,response)=>{
    try {
        const employee=new Employee(request.body);
        await employee.save();
        response.status(200).json(employee);
    } catch (error) {
        response(500).json(error);
    }
})

router.put('/:id',async (request,response)=>{
    try {
        const employee=await Employee.findByIdAndUpdate(request.params.id,request.body,{new:true});
        response.status(200).json(employee);
    } catch (error) {
        response.status(500).json(error);
    }
  
})

router.delete('/:id',async (request,response)=>{
    try {
        const employee=await Employee.findByIdAndDelete(request.params.id);
        response.status(200).json(employee);
    } catch (error) {
        response.status(500).json(error);
    }
})

module.exports=router;
