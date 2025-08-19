const express=require("express");
const { authcandidatemiddleware } = require("../middlewares/candidsatemiddleare");
const route=express.Router();
const {PrismaClient}=require("@prisma/client");
const prisma= new PrismaClient();
const zod=require("zod");

const jobapplicationschema=zod.object({
   status:zod.string().optional()
});
route.post("/job/apply/:id",authcandidatemiddleware,async(req,res)=>{
  const jobid=req.params.id;
  const candidateid=req.id;
  const result=jobapplicationschema.safeParse(req.body);
  if(!result){
    return res.status(400).json({
        message:"invalid inputs"
    })
  }
  const body=result.data;
  try{
    const isapplied=await prisma.application.findFirst({
        where:{
            jobId : jobid ,
            candidateId:candidateid,   
                   
        }
    });
    if(isapplied){
        return res.status(409).json({
            message:"user is already applied for the job"
        });
    }
    const apply=await prisma.application.create({
        data:{
            jobId:jobid,
            candidateId:candidateid,
            status:body.status 
        }
    });
    if(apply){
        return res.status(200).json({
            message:"successfully applied for the job",
            withid:apply.id,
            jobid:jobid
        })
    }
  }catch(err){
    return res.status(500).json({
        message:"something went wrong",
        error:err.message
    })
  }
});


const profileschema=zod.object({
     profielphoto:zod.string(),
     description:zod.string(),
     skills:zod.array(zod.string()),
     location:zod.string(),
     exprerience:zod.any(),
     education:zod.any()
})
route.post("/addinfotoprofile",authcandidatemiddleware,async(req,res)=>{
       const profilebody=req.body;
       const result=profileschema.safeParse(profilebody);
       
       if(!result.success){
        return res.status(400).json({
            message:"invalid inputs"
        });
       }
       const profilebodydata=result.data;
       try{
          const createprofile = await prisma.candidateProfile.create({
                data:{
                profielphoto:profilebodydata.profielphoto,
                description:profilebodydata.description,
                userId:req.id,
                location:profilebodydata.location,
                exprerience:JSON.stringify(profilebodydata.exprerience),
                skills:profilebodydata.skills,
                education:JSON.stringify(profilebodydata.education)
            }
          });
          
          if(createprofile){
            return res.status(200).json({
                message:"profile is created successfully !",
                ofid:req.id,
                withid:createprofile.id
            });
          } 
       }catch(err){
              return res.status(500).json({
                message:"something went wrong ",
                error:err.message
              })
       }
});

route.get("/myprofile",authcandidatemiddleware,async(req,res)=>{
 const getmyprofile=await prisma.candidateProfile.findUnique({
    where:{
        userId:req.id
        }
      });
      if(!getmyprofile){
        return res.status(204).json({
            message:"profile not found!"
        })
      }else{
        //overwriter the exprerience,education
          const parsedProfile = {
            ...getmyprofile,
            exprerience: JSON.parse(getmyprofile.exprerience || "null"),
            education: JSON.parse(getmyprofile.education || "null")
           };
        return res.status(200).json({
            message:"profile",
            parsedProfile
        })
      }
});

const updateprofileschema=zod.object({
     profielphoto:zod.string().optional(),
     description:zod.string().optional(),
     skills:zod.array(zod.string()).optional(),
     location:zod.string().optional(),
     exprerience:zod.any().optional(),
     education:zod.any().optional()
})
route.put("/update/profile",authcandidatemiddleware,async(req,res)=>{
       const result=updateprofileschema.safeParse(req.body);
       if(!result.success){
        return res.status(400).json({
            message:"invalid inputs"
        });
       }
       const body=result.data;
       const isbodyexist= await prisma.candidateProfile.findUnique({
            where:{
            userId:req.id
               }
       });
       if(!isbodyexist){
        return res.status(204).json({
            message:"candidate dose not exist with id "+ req.id
        });
       }
         const updatebody=await prisma.candidateProfile.update({
            where:{
                userId:req.id
            },
            data:{
                profielphoto:body.profielphoto ??isbodyexist.profielphoto ,
                description:body.description ?? isbodyexist.description,
                skills:body.skills ?? isbodyexist.skills,
                location:body.location ?? isbodyexist.location,
                exprerience:JSON.stringify(body.exprerience ?? isbodyexist.exprerience),
                education:JSON.stringify(body.education ?? isbodyexist.education)
            }
        })
        if(updatebody){
            return res.status(200).json({
                message:"record is updated successfully",
                ofid:req.id
            })
        }  
});



route.get("/myallapplicatons",authcandidatemiddleware,async(req,res)=>{
    const candidateid=req.id;
    try{
        const alljobs = await prisma.application.findMany({
            where: {
             candidateId: candidateid
              },
               select: {
                     job: true
                    }
             });
             
        if(!alljobs){
            return res.status(204).json({
                message:"No more posts"
            })
        }else{
             return res.status(200).json({
                message:"all jobs are fetch suceessfully ",
                forid:candidateid,
                alljobs
            })
        }
    }catch(err){
       return res.status(500).json({
        message:"something went wrong",
        error:err.message
       })
    }
});


route.delete("/job/delete/:id",authcandidatemiddleware,async(req,res)=>{
  const jobid=req.params.id;
  const candidateid=req.id;
  try{
    const deletejob=await prisma.application.deleteMany({
        where:{
            jobId:jobid,
            candidateId:candidateid,
        }
    });
    if(deletejob.count===0){
        return res.status(404).json({
          message:"no more items for delete"
        })
    }
    if(deletejob){
        return res.status(200).json({
            message:"successfully delete the job",
            byid:candidateid,
            ofidjob:jobid
        })
    }
  }catch(err){
    return res.status(500).json({
        message:"something went wrong",
        error:err.message
    })
  }
});



module.exports=route;
