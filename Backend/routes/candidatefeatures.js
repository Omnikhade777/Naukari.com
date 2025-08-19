const express=require("express");
const route=express.Router();
const zod=require("zod");
const {PrismaClient}=require("@prisma/client");
const prisma=new PrismaClient;
const { authcandidatemiddleware } = require("../middlewares/candidsatemiddleare");



const jobidschema=zod.object({
    jobid:zod.string(),
})
route.post("/savejobs",authcandidatemiddleware,async(req,res)=>{
    const result=jobidschema.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({
            message:"invalid id"
        })
    }
    const body=result.data;
    try{  
        const isexist=await prisma.savedjobs.findFirst({
        where:{
            jobId:body.jobid,
            candidateId:req.id 
        }
    });
    if(isexist){
        return res.status(409).json({
         message:"job is already saved !"
        })
    }
    const savejob= await prisma.savedjobs.create({
          data:{
            candidateId:req.id,
            jobId:body.jobid,
          }
    })
   if(savejob){
       return res.status(200).json({
         message:"job is saved",
         withid:savejob.id,
         jobid:body.jobid
        });
   }}catch(err){
         return res.status(500).json({
         message:"something went wrong"
        })
   }
});



route.get("/getallsavedjobs",authcandidatemiddleware,async(req,res)=>{
    try{ const getsavedjobs=await prisma.savedjobs.findMany({
           where:{
            candidateId:req.id
           },
           include:{
            job:true
           }
     });

     if(getsavedjobs.length===0){
        return res.status(200).json({
            message:"no saved jobs"
        })
     }
     return res.status(200).json({
        message:"all saved jobs",
        getsavedjobs
     })}catch(err){
        return res.json({
        error:err.message
        })
     }
});



route.delete("/deletesavejobs/:id",authcandidatemiddleware,async(req,res)=>{
    const id=req.params.id;
    try{  
        const isexist=await prisma.savedjobs.findFirst({
        where:{
            jobId:id,
            candidateId:req.id 
        }
    });
    if(!isexist){
        return res.status(409).json({
         message:"no job to delete"
        })
    }
    const deletesavejob= await prisma.savedjobs.delete({
          where:{
           id:isexist.id
          }
    })
   if(deletesavejob){
       return res.status(200).json({
         message:"job is deleted",
         ofid:deletesavejob.id
        });
   }}catch(err){
         return res.status(500).json({
         message:"something went wrong"
        })
   }
});



route.get("/recomendedjobs",authcandidatemiddleware,async(req,res)=>{
    const candidateid=req.id;
    try{
     const findcandidate=await prisma.candidateProfile.findUnique({
        where:{
            userId:candidateid
        }
     });
     if (!findcandidate) {
     return res.status(404).json({ message: "Candidate not found" });
      }
     const recomendjobs=await prisma.job.findMany({
        where: {
    OR: [
      {
        skillsrequired: {
          hasSome: findcandidate.skills ?? [],
        },
      },
      {
        location: findcandidate.location,
      },
     ],
     },
     })
     
     if(recomendjobs.length===0){
        return res.status(200).json({
            message:"no recomended jobs"
        })}

    return res.status(200).json({
        message:"all recomended jobs are as follows",
        recomendjobs
    })
    }catch(err){
     return res.status(500).json({
        message:"something went wrong",
        error:err.message
     })
    }
})




route.get("/similarjobs/:id",authcandidatemiddleware,async(req,res)=>{
      const jobid=req.params.id;
      try{
         const jobinfo=await prisma.job.findUnique({
            where:{
                id:jobid
            }
         });

          const findsimilarjobs=await prisma.job.findMany({
               where:{
                OR:[
                    {
                    title:jobinfo.title,
                    },
                    {
                        skillsrequired:{
                            hasSome:jobinfo.skillsrequired ?? [],
                        }
                    },
                    {
                        jobtype:jobinfo.jobtype
                    }
                ]
               }
          });
          if(findsimilarjobs.length===0){
            return res.status(200).json({
                message:"no similar jobs"
            })
          }
          return res.status(200).json({
            message:"similar jobs",
            findsimilarjobs
          })
      }catch(err){
        return res.status(500).json({
            message:"something went wrong",
            error:err.message
        })
      }
});




route.get("/filterjobs",authcandidatemiddleware,async(req,res)=>{
     try{  
           const { title, location } = req.query;
           const orConditions = [];

            if (title) {
                orConditions.push({
                     title: { contains:title.trim(), mode: 'insensitive' }
                    });
                  }

            if (location) {
              orConditions.push({
                location: { contains:location.trim(), mode: 'insensitive' }
              });
            }

            const jobs = await prisma.job.findMany({
              where: {
                OR: orConditions
              }
            });

          if(jobs.length===0){
            return res.status(400).json({
                message:"no matching result"
            })
          }
          return res.status(200).json({
          jobs
          })
          }catch(err){
            return res.status(500).json({
                message:"something went wrong",
                error:err.message
            });
          }
});

module.exports=route;