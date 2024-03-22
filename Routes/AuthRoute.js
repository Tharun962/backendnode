const userModel=require('../Models/UserModel.js');
const express=require('express');

const router=express.Router();


router.get("/logout",(req,res)=>{
    const cookie=req.cookies.username;
    if(cookie)
    {
        res.cookie("username","",{expires:new Date(Date.now())});
        res.send({msg:"Logout successfully",logout:true})
    }
    else
    {
        res.send({msg:"No cookie found",logout:true})
    }
});

router.post("/register",async(req,res)=>{
    const registerBody=req.body;
    try
    {
      let user=await userModel.findOne({email:registerBody.email});
      if(user)
      {
        res.send({msg:"User already registered",register:false});
        return;
      }
      else
      {
        let create=new userModel(registerBody);
        await create.save();
        res.send({msg:"User registered",register:true});
      }
    }
    catch(err)
    {
        res.send({msg:"Error Occured",register:false});
    }
});

router.post("/login",async(req,res)=>{
    const loginBody=req.body;
    console.log(loginBody);
    try
    {
      let user=await userModel.findOne({email:loginBody.email});
      if(user)
      {
        if(user.password===loginBody.password)
        {
            res.cookie("username",user.email,{maxAge:900000,httpOnly:true});
            res.send({msg:"can login",login:true});
        }
        else
        {
            res.send({msg:"password incorrect",login:false});
        }
      }
      else
      {
        res.send({msg:"No user found!",login:false});
      }
    }
    catch(err)
    {
        res.send({msg:"ERROR occured",login:false});
    }
});

module.exports=router;

