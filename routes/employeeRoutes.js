const express = require("express")
const employeeRouter = express.Router()
const jwt = require("jsonwebtoken")
const { employeeModel } = require("../models/employeeModel")
const { authMiddleware } = require("../middleware/auth.middleware")
require("dotenv").config()

//add employees

employeeRouter.post("/add",async(req,res)=>{
try{
const data=new employeeModel(req.body)
await data.save()
res.status(200).json({ msg: "employee data add" })
}
catch(err){
    res.status(400).json({ msg: err.message})
}
}) 

//get employees
employeeRouter.get("/",async(req,res)=>{
    const {page}=req.query
    let limit=5
    let skip=page*limit

   const data=await employeeModel.find().skip(skip).limit(limit)
   res.status(200).json({ msg:data })
    })

//delete employees

employeeRouter.delete("/delete/:id",authMiddleware,async(req,res)=>{
    const {id}=req.params
    console.log(id)
    try{
    await employeeModel.findByIdAndDelete({_id:id})
    res.status(200).json({ msg: "employee data delete" })
    }
    catch(err){
        res.status(400).json({ msg: err.message})
    }
})
//update employees

employeeRouter.patch("/update/:id",authMiddleware,async(req,res)=>{
    const {id}=req.params
    console.log(id)
    try{
    await employeeModel.findByIdAndUpdate({_id:id},req.body)
    res.status(200).json({ msg: "employee data update" })
    }
    catch(err){
        res.status(400).json({ msg: err.message})
    }
})





module.exports={
    employeeRouter
}