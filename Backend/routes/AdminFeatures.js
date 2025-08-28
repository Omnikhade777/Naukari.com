const express=require("express");
const { authadminmiddleware } = require("../middlewares/adminmiddleware");
const route=express.Router();
const {PrismaClient}=require("@prisma/client");
const prisma=new PrismaClient;

route.get("/aboutadmin",authadminmiddleware,async(req,res)=>{
 const adminid=req.id;
 
 const data=await prisma.admin.findUnique({
   where:{
      id:adminid
   },
   select:{
      id:true,
      name:true,
      email:true,
   }
 });

 if(data){
  return  res.status(200).json({
      message:"admin data",
      data
   })
 }
 return  res.status(404).json({
 message:"admin not found",
 })
})


route.get("/job-applications/:id",authadminmiddleware,async(req,res)=>{
      const jobid=req.params.id.trim();
      const adminId=req.id;
      try{
         const getalljobapplications=await prisma.job.findFirst({
            where:{
                id:jobid,
                adminId:adminId,
               },
               select:{
                  applications:{
                        select:{
                               id:true,
                               appliedAt:true,
                               jobId:true,
                               candidateId:true,
                               candidate:{
                                          select:{
                                           id:true,
                                           name:true,
                                           email:true
                                                 }
                                             }
                     }
                  }
               }
         });
         if(!getalljobapplications){
            return res.status(404).json({
                  message:"no application for this job"
            });
         }
         return res.status(200).json({
            message:`all the application for the jobid ${jobid}`,
            getalljobapplications
         })
        }catch(err){
         return res.status(500).json({
            message:"something went wrong",
            error:err.message
         })
        }
});


//route for mostapplied jobs and number of candidates and jobs
route.get("/stats",authadminmiddleware,async(req,res)=>{
      const numberofcandidates=await prisma.candidate.count();
      const numbersofjobsposted=await prisma.job.count();
      const jobwithapplicationcount=await prisma.job.findMany({
         include:{
            _count:{
               select:{
                  applications:true
               }
            }
         },
        orderBy: {
        applications: {
          _count: 'desc'
        }
      }
      })
  return res.status(200).json({
    message:{
      candidate: `Total numbers of candidates ${numberofcandidates}`,
      jobs:`Total numbers of jobs ${numbersofjobsposted}`,
      mostapplied: jobwithapplicationcount
     }
  })
})
module.exports=route;