const express=require('express');
const employeeRouter=require('./employeeRouter');
const departmentRouter=require('./departmentRouter');
require('dotenv').config();

const PORT=process.env.port || 4000;


const app=express();
app.use(express.json());

app.use('/employee',employeeRouter);

app.use('/department',departmentRouter);



app.listen(PORT,function(){
    console.log('server is running on port 4000');
})