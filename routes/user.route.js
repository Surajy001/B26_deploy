const express=require("express");
const {UserModel}=require("../model/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config()

const userRouter=express.Router()

userRouter.post("/register", async(req,res)=>{
    const {name,email,pass}=req.body
   try{
        bcrypt.hash(pass,5,async(err,hash)=>{
            if(err){
                res.json({error:err.message})
            }else{
                const user=new UserModel({name,email,pass:hash})
                await user.save()
                res.json({msg:"User has been registered",user:req.body})
            }
        })
   }catch(err){

   }
})

userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body;
    try{
        const user=await UserModel.findOne({email})
        if(user){
            bcrypt.compare(pass,user.pass,(err,result)=>{
                if(result){
                    // let token=jwt.sign({course:"BE"},"masai")
                    let token=jwt.sign({userID:user._id,user:user.name},process.env.secret)
                    res.json({msg:"Login Successful",token})
                }else{
                    res.json({error:"Wrong Credentcials"})
                }
            })
        }else{
            res.json({msg:"user does not exist"})
        }
    }catch(err){
        
    }
})

module.exports={
    userRouter
}
