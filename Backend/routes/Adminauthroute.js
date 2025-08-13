const express=require("express");
const route=express.Router();
const zod=require("zod");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt =require("bcrypt")
const jwt = require("jsonwebtoken"); 
const { JWT_SECREATE } = require("../config");
const handelforgetpassword=require("./AdminForgetpassword");
route.use("/forgetpassword",handelforgetpassword);

const Adminsignupschema=zod.object({
    name:zod.string(),
    email:zod.string().email(),
    password:zod.string().min(6)
})
route.post("/signup",async (req,res)=>{

    const adminbody = req.body;
    const result=Adminsignupschema.safeParse(adminbody);
    if(!result.success){
        return res.status(400).json({
            message:"invalid inputs"
        })
    }
    const body=result.data;
    try{
    const hashedpassword=await bcrypt.hash(body.password,10);

    const isexistadmin = await prisma.admin.findUnique({
        where:{
            email:body.email
        }
    })
    if(isexistadmin){
      return res.status(409).json({
        message:"admin is already exist"
      });
    }
   
    const user= await prisma.admin.create({
        data:{
            name:body.name,
            email:body.email,
            password:hashedpassword
        }
    });
    if(user){
        return res.status(200).json({
            message:"admin is created successfully",
            withid:user.id
        })
    }
    }catch (e) {
        return res.status(500).json({ 
        message: "Something went wrong" 
        });
    }
})



const Adminsigninschema=zod.object({
    email:zod.string().email(),
    password:zod.string().min(6)
})
route.post("/signin",async (req,res)=>{
   const signinbody=req.body;
   const result=Adminsigninschema.safeParse(signinbody);
   try{
     if(!result.success){
        return res.status(400).json({
            message:"invalid inputs"
        });}
     
     const body=result.data;
     const isadminexist=await prisma.admin.findUnique({
        where:{
          email:body.email,
        }
     })
     if (!isadminexist) {
         return res.status(404).json({ message: "Candidate not found" });
        }
      const ispasswordcorrect= await bcrypt.compare(body.password, isadminexist.password);
      if( ispasswordcorrect){
          const token= jwt.sign({id:isadminexist.id},JWT_SECREATE);
          return res.status(200).json({
            message:"admin is loged in successfully !",
            id:isadminexist.id,
            token:token
          })
      }else{
        return res.status(400).json({
            message:"password is wrong"
        });
      }
   }catch(e){
     return res.status(500).json({
       message:"something went wrong"+ e
     })
   }

})


module.exports=route;