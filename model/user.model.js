const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    name:String,
    email:String,
    pass:String
},{
     versionKey:false
})
    
//model
const UserModel=mongoose.model("user",userSchema)
    
module.exports={
    UserModel
}
