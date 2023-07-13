const express = require("express")
const { connection } = require("./db")
const { userRouter } = require("./routes/userRoutes")
const { employeeRouter } = require("./routes/employeeRoutes")
const cors=require("cors")
require("dotenv").config()
const app=express()
app.use(cors())
app.use(express.json())
app.use("/",userRouter)
app.use("/employees",employeeRouter)
app.listen(process.env.port,async()=>{
    try{
        await connection
   console.log(`server is running at ${process.env.port}`)
    }
    catch(err){
        console.log(err)
    }
})
