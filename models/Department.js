const mongoose=require('mongoose');

const departmentSchema={
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
}

const Department=new mongoose.model('Department',departmentSchema);
module.exports=Department;