const { default: mongoose } = require("mongoose");

const employeeSchema=mongoose.Schema({
    firstname:String,
    lastname:String,
    email:String,
    department:String,
    salary:Number
})

const employeeModel=mongoose.model("employee",employeeSchema)
module.exports={
    employeeModel
}