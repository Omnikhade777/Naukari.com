const express=require("express");
const route=express.Router();
const adminauthroute=require("./Adminauthroute");
const candidateauthroute=require("./Candidateauthroute");
const adminjob=require("./Adminjob");
const candidatehandler=require("./candidatehandler")
const adminoperation=require("./AdminFeatures");
const candidatefeatures=require("./candidatefeatures");


route.use("/adminauth",adminauthroute);
route.use("/candidateauth",candidateauthroute);
route.use("/adminjobhandler",adminjob);
route.use("/candidatehandler",candidatehandler);
route.use("/adminoperations",adminoperation);
route.use("/candidatefeatures",candidatefeatures)

module.exports=route;