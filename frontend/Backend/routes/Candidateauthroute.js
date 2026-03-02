const express=require("express");
const route=express.Router();
const zod=require("zod");
const bcrypt=require("bcrypt")
const {PrismaClient}=require("@prisma/client");
const prisma=new PrismaClient;
const jwt=require("jsonwebtoken");
const { JWT_SECREATE } = require("../config");
const candidateforgetpassword=require("./CandidateForgetpassword");
route.use("/forgotcandidatepassword",candidateforgetpassword);

const candidatesignupschema=zod.object({
    name:zod.string(),
    email:zod.string().email(),
    password:zod.string().min(6)
});
route.post("/signup",async (req,res)=>{
    const candidatebody=req.body;
    const result=candidatesignupschema.safeParse(candidatebody);
    try{
        if(!result.success){
            return res.status(400).json({
                message:"invalid inputs"
            })
        }
        const body=result.data;
        const hashpassword=await bcrypt.hash(body.password,10);
        const iscandidateexist=await prisma.candidate.findUnique({
            where:{
                email:body.email,
            }
        })
        if(iscandidateexist){
            return res.status(409).json({
                message:"candidate already exist"
            });
        }
        const candidate=await prisma.candidate.create({
            data:{
                name:body.name,
                email:body.email,
                password:hashpassword
            }
        });

        if(candidate){
            return res.status(200).json({
                message:"candidate is created successfully",
                id:candidate.id
            })
        }
    }catch(err){
        return res.status(500).json({
        message:"something went wrong"+ err
     })
    }
});

const candidatesigninschema=zod.object({
    email:zod.string().email(),
    password: zod.string().min(6) 

})
route.post("/signin",async (req,res)=>{
    const candidatebody=req.body;
    const result=candidatesigninschema.safeParse(candidatebody);
    if(!result.success){
        return res.status(400).json({
            message:"invalid inputs"
        });
    }
    const body=result.data;
    try{
        const isexistcandidate=await prisma.candidate.findUnique({
            where:{
                email:body.email
            }
        });
       if (!isexistcandidate) {
         return res.status(404).json({ message: "Candidate not found" });
        }
        const ispasswordcorrect=await bcrypt.compare(body.password,isexistcandidate.password);
        if(ispasswordcorrect){
            const token = jwt.sign({id:isexistcandidate.id},JWT_SECREATE);
            return res.status(200).json({
                message:"candidate login successfully !",
                id:isexistcandidate.id,
                token:token
            })
        }
      }catch(err){
        return res.status(500).json({
            message:"something went wrong",
            error: err.message
        })
      }
})

module.exports=route;