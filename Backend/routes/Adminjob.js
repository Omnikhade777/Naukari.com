const express = require("express");
const route = express.Router();
const {PrismaClient}=require("@prisma/client");
const prisma=new PrismaClient;
const { authadminmiddleware } = require("../middlewares/adminmiddleware");
const zod=require("zod");

const jobpostschema=zod.object({
    title:zod.string(),
    description:zod.string(),
    postedAt: zod.coerce.date().optional(),
    deadline: zod.coerce.date(),  
    isActive: zod.boolean(),
    skillsrequired:zod.array(zod.string()),
    salary:zod.string(),
    location:zod.string(),
    jobtype:zod.string()
});

route.post("/jobpost",authadminmiddleware,async(req,res)=>{
    const jobbody=req.body;
    const result=jobpostschema.safeParse(jobbody);
    if(!result.success){
     return res.status(400).json({
        message:"invalid inputs"
     });
    }
    const body=result?.data;
    try{
      const postjob = await prisma.job.create({
      data: {
           title: body.title,
           description: body.description,
           postedAt: body.postedAt ? new Date(body.postedAt) : undefined,
           deadline: body.deadline,
           isActive: body.isActive ?? true,
           adminId: req.id,
           skillsrequired:body.skillsrequired,
           salary:body.salary,     
           location:body.location,     
           jobtype:body.jobtype       
          }
         });

    if(postjob){
        return res.status(200).json({
            message:"jobs are created successfully !",
            forid:postjob.adminId,
            withid:postjob.id
        });
    }
    }catch(e){
     return res.status(500).json({
        message:"something went wrong ? " ,
        error:message.e
     })
    }

});

route.get("/adminpostedjobs/:id",async(req,res)=>{
    try{
    const adminid=req.params.id;
    const allpost=await prisma.job.findMany({
        where:{
            adminId:adminid
        }
    });
    if(allpost.length===0){
        return res.json({
            message:"there are no posts",
            posts:[]
        });
    }else{
        return res.json({
            message:"all posts are displayed",
            posts:allpost
        });
    }
    }catch(error){
           return res.status(500).json({
      message: "Something went wrong",
      error: error.message
    }); 
    }
})

route.get("/job/:id",async(req,res)=>{
    try{
    const jobid=req.params.id;
    const postedjob=await prisma.job.findMany({
        where:{
            id:jobid
        }
    });
    if(postedjob.length===0){
        return res.json({
            message:"there are no posts",
            posts:[]
        });
    }else{
        return res.json({
            message:"job post",
            job:postedjob
        });
    }
    }catch(error){
           return res.status(500).json({
      message: "Something went wrong",
      error: error.message
    }); 
    }
})


route.get("/alljobpost",async(req,res)=>{
    try{
    const allpost=await prisma.job.findMany({});
    if(allpost.length===0){
        return res.json({
            message:"there are no posts",
            posts:[]
        });
    }else{
        return res.json({
            message:"all posts are displayed",
            posts:allpost
        });
    }
    }catch(error){
           return res.status(500).json({
      message: "Something went wrong",
      error: error.message
    }); 
    }
});



const jobupdateschema=zod.object({
    title:zod.string().optional(),
    description:zod.string().optional(),
    postedAt: zod.coerce.date().optional(),
    deadline: zod.coerce.date().optional(),  
    isActive: zod.boolean().optional(),
    skillsrequired:zod.array(zod.string()).optional(),
    salary:zod.string().optional(),
    location:zod.string().optional(),
    jobtype:zod.string().optional()

});
route.put("/updatejob/:id",authadminmiddleware,async(req,res)=>{
   const postid=req.params.id;
    const result=jobupdateschema.safeParse(req.body);
    if(!result.success){
      
        return res.status(400).json({
            message:"invalid inputs"
        });
    }
    const updatebody=result.data;
   try{
    const isexist=await prisma.job.findUnique({
        where:{
            id:postid
        }
    });
    if(!isexist){
      return res.status(404).json({
        message:"there is no post"
      });
    }
    const updatepost=await prisma.job.update({
        where:{
            id:postid
        },
        data:{
            title:updatebody.title ?? isexist.title,
            description:updatebody.description ?? isexist.description,
            postedAt:updatebody.postedAt ? new Date(updatebody.postedAt) : isexist.postedAt,
            deadline:updatebody.deadline ?? isexist.deadline ,
            isActive:updatebody.isActive ?? isexist.isActive,
            skillsrequired:updatebody.skillsrequired ?? isexist.skillsrequired,
            salary:updatebody.salary ?? isexist.salary,
            location:updatebody.location ?? isexist.location,
            jobtype:updatebody.jobtype ?? isexist.jobtype
        }
    });
    if(updatepost){
        return res.status(200).json({
            message:"post is updated successfully !",
            byid:req.id
        })
    }
   }catch(err){
    return res.status(500).json({
        message:"something went wrong",
        error:err.message
    })
   }
});

route.delete("/deletepostbyid/:id",authadminmiddleware,async(req,res)=>{
      const jobid=req.params.id;
      try{
        const findjob=await prisma.job.deleteMany({
            where:{
                id:jobid
            }
        });
        if(findjob.count===0){
          return res.status(404).json({
            message:"there are no posts"
          });
        }else{
            return res.status(200).json({
                message:"post is deleted successfully",
                withid:jobid,
                by:req.id
            })
        }
      }catch(err){
        return res.status(500).json({
            message:"something went wrong",
            error:err.message
        })
      }
});

module.exports = route;
