const express=require("express");
const route=express.Router();
const zod=require("zod");
const {PrismaClient}=require("@prisma/client");
const prisma=new PrismaClient;
const nodemailer=require("nodemailer");
const crypto=require("crypto")
const bcrypt=require("bcrypt");

const cnadidateforgetpassword=zod.object({
    email:zod.string().email()
});
route.post("/forget-password",async(req,res)=>{
const result=cnadidateforgetpassword.safeParse(req.body);
if(!result.success){
    return res.status(400).json({
        message:"invalid inputs"
    })
}
const body=result.data;

const findemail=await prisma.candidate.findUnique({
    where:{
        email:body.email
    }
});
if(!findemail){
   return res.status(404).json({
    message:"candidate not found with this email id"
   })
}

const resetToken=await crypto.randomBytes(32).toString("hex");
await prisma.candidate.update({
    where:{
        email:body.email
    },
    data:{
        resetToken,
        resetTokenExpiry:new Date(Date.now() + 15 *60*1000)
    }
});

const resetUrl = `http://localhost:5173/userreset-password?token=${resetToken}`;

await sendPsswordResetEmail(body.email,resetUrl);
async function sendPsswordResetEmail(email,link){
    const transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASSWORD,   
         }
    });
    await transporter.sendMail({
        from:`"Naukari.com" <${process.env.EMAIL}>`,
        to:email,
        subject:'Password Reset',
        html: `<p>Click the link below to reset your password:</p><a href="${link}">${link}</a>`,
    })
  return res.status(200).json({
    message:"Email sent successfully!",resetUrl
  })
}
});



const resetpasswrodschema=zod.object({
     password:zod.string(),
     token:zod.string()
});
route.post("/reset-password",async(req,res)=>{
    const result=resetpasswrodschema.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({
            message:"invalid inputs"
        });
    }
    const body=result.data;
    const hashpassword=await bcrypt.hash(body.password,10);
    try {
        const finduser=await prisma.candidate.findFirst({
        where:{
            resetToken:body.token,
            resetTokenExpiry:{
                gte:new Date()
            }
        }
    });
    if(!finduser){
        return res.status(404).json({
            message:"candidate not found or token expaired"
        });
    }
    const updatepassword = await prisma.candidate.update({
        where:{
            id:finduser.id
        },
        data:{
            password:hashpassword,
            resetToken:null,
            resetTokenExpiry:null
        }
    });
    if(updatepassword){
        return res.status(200).json({
            message:"password reset successfully"
        });
    }}catch(err){
        return res.status(500).json({
            message:"something went wrong",
            error:err.message
        })
    }
})


module.exports=route;