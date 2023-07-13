const express = require("express")
const { userModel } = require("../models/userModel")
const bcrypt = require("bcrypt")
const userRouter = express.Router()
const jwt = require("jsonwebtoken")
require("dotenv").config()
userRouter.post("/signup", async (req, res) => {
    const {email,password}=req.body

    try{
     
        const user = await userModel.findOne({ email })
        if(user!==null){
            if(user.email==email){
                res.status(400).json({ msg: "user already register" })
             }
        }
        else{
            bcrypt.hash(password, 5, async (err, hash) => {
                            if (hash) {
                                const data = new userModel({ email, password: hash })
                                await data.save()
                                res.status(200).json({ msg: "user register" })
                            }
                            else {
                                res.status(400).json({ msg:err.message })
                            }
                        })
        }
    }
    catch(err){
        res.status(400).json({ msg: err.message})
    }
})

userRouter.post("/login", async (req, res) => {
 
 
    try{
        const {email,password}=req.body
        const user = await userModel.findOne({ email })
    //     if(user!=null){
    //         if(user.email!==email){
    //             res.status(400).json({ msg: "user not registered" })
    //          }
    //     }
    //    else{
            bcrypt.compare(password, user.password,async (err, result) => {
                if (result) {
                    const token = jwt.sign({ userEmail: user.email},process.env.SECRET_KEY)
                    res.status(200).json({ msg: token })
                }
                else {
                    res.status(400).json({ msg: err.message })
                }
            })
        }
    //    }
catch(err){
    res.status(400).json({ msg: err.message })
}
} )




module.exports = {
    userRouter
}