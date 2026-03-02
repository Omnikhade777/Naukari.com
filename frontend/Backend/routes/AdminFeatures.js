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
});


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
      const jobwithapplicationcount=await prisma.job.findMany({
         where:{
         adminId:req.id
         },
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
      mostapplied: jobwithapplicationcount
  })
});

route.post("/handleapplicationstatus/:id/:userid", authadminmiddleware, async (req, res) => {
  const jobid = req.params.id;
  const candidateid = req.params.userid;
  try {
    const findjob = await prisma.application.findFirst({
      where: {
        jobId: jobid,
        candidateId: candidateid,
      },
    });

    if (!findjob) {
      return res.status(404).json({ message: "Application not found" });
    }
    const updatedApp = await prisma.application.update({
      where: {
        id: findjob.id, 
      },
    data: { status: req.body.status },
    });

    res.json({ message:"Status sent"});
  } catch (err) {
    console.error(err);
    res.status(500).json({
       message: "Error updating application status"
      });
  }
});



module.exports=route;