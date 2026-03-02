const express=require("express");
const route=express.Router();
const crypto=require("crypto");
const {PrismaClient}=require("@prisma/client");
const prisma=new PrismaClient;
const nodemailer=require("nodemailer");
const bcrypt=require("bcrypt");
const zod=require("zod");

const resentschema=zod.object({
    email:zod.string().email()
})
route.post("/forget-password",async(req,res)=>{
    const result=resentschema.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({
            message:"invalid inputs"
        })
    }
    const body=result.data;
    
    const admin=await prisma.admin.findUnique({
        where:{
            email:body.email
        }
    });
    if(!admin){
        return res.status(404).json({
            message:"admin not found"
        })
    }
    const resetToken=crypto.randomBytes(32).toString("hex");
    await prisma.admin.update({
        where:{
            email:body.email
        },
        data:{
            resetToken,
            resetTokenExpiry:new Date(Date.now()+15*60*1000)
        }
    });
    const resetUrl = `http://localhost:5173/reset-password?token=${resetToken}`;
     
    await sendPasswordResetEmail(body.email, resetUrl);

     async function sendPasswordResetEmail(email, link) {
             const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                       user:process.env.EMAIL,
                       pass:process.env.PASSWORD,
                },
               });
                 
                    await transporter.sendMail({
                    from: `"Naukari.com" <${process.env.EMAIL}>`,
                    to : email,
                    subject: 'Password Reset',
                    html: `<p>Click the link below to reset your password:</p><a href="${link}">${link}</a>`,
                  });
                }


    return res.json({
         message: "Email sent successfully!", resetUrl
         });
});


const resetpasswordschema=zod.object({
    newPassword:zod.string(),
    token:zod.string()
})
route.post("/reset-password",async(req,res)=>{
    const result=resetpasswordschema.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({
            message:"invalid inputs"
        })
    }
    const body=result.data;
    const admin=await prisma.admin.findFirst({
       where:{
        resetToken:body.token,
        resetTokenExpiry:{
            gte:new Date()
        }}
    })
    if (!admin) {
    return res.status(400).json({ message: "Token is invalid or expired" });
      }

    const hashedPassword = await bcrypt.hash(body.newPassword, 10);
  
    await prisma.admin.update({
    where: { id: admin.id },
    data: {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null
    }
  });

  return res.json({ message: "Password updated successfully" });
});
 
module.exports=route;
