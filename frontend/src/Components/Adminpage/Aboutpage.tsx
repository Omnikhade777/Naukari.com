import axios from "axios";
import { useEffect, useState } from "react";
import Adminposts from "./Adminposts";
import Postjobs from "./Postjobs";
import { useNavigate } from "react-router-dom";
import Mostappliedjobs from "./Mostappliedjobs";
import { BACKEND_URL } from "../../Config";

const Aboutpage=()=>{

    interface alljobposts{
    id:string,
    title:string,
    description:string,
    postedAt:string,
    deadline:string,
    isActive:boolean,
    adminId:string,
    skillsrequired:string[],
    salary:string|null,
    location:string|null,
    jobtype:string|null
    }

    interface admindata{
        id:string,
        email:string,
        name:string
    }

    const [infodata,setinfodata]=useState<admindata>({
        id:"",
        email:"",
        name:""
    });
   
    const [jobs,setjobs]=useState<alljobposts[]>([]);
    const [view, setView] = useState<"admin"|"post"|"most">("admin");

    const navigate=useNavigate();

    useEffect(()=>{
        const getresponse=async()=>{
        const response=await axios.get(`${BACKEND_URL}/api/v1/adminoperations/aboutadmin`,{
            headers:{
              Authorization:localStorage.getItem("admintoken")
            }
        })
        const admininfo=response?.data?.data;
        setinfodata({
           id: admininfo.id||"",
          email: admininfo.email||"",
          name: admininfo.name||""
        })
        }
        getresponse();
    },[]);

    const handledeletejob=async(jobid:string)=>{
     await axios.delete(`${BACKEND_URL}/api/v1/adminjobhandler/deletepostbyid/${jobid}`,{
      headers:{
        Authorization:localStorage.getItem("admintoken")
      }
    })
    setjobs(jobs.filter((a)=>a.id !== jobid));
    
  }

   useEffect(()=>{
    const getjobpostedbyadmin=async()=>{
    if (!infodata.id) return;
    const response=await axios.get(`${BACKEND_URL}/api/v1/adminjobhandler/adminpostedjobs/${infodata.id}`)
    const jobsdata=response.data.posts;
    setjobs(jobsdata);
    }
    getjobpostedbyadmin()
   },[infodata.id])

    return(
        <>
    
        <div className="min-h-screen bg-gray-50 p-6">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
<div className="col-span-1">
    <div className="sticky  top-6">
        <div>
          <button 
          onClick={()=>{navigate("/landingpage")}}
       className="px-6 py-2  bg-gray-400 text-white rounded shadow-sm hover:bg-gray-500 transition font-medium">
    Back
  </button>
        </div>
 <div className="bg-white h-[60vh] flex flex-col items-center justify-center  mt-20 shadow-xl rounded-2xl p-8 border border-gray-100">
<h1 className="text-2xl font-bold text-blue-700 text-center mb-6">
    {infodata.name || "Company Name"}
</h1>
    <div className="space-y-4">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50">
    <span className="font-semibold text-gray-600">AdminID:</span>
    <span className="text-gray-800">{infodata.id}</span>
    </div>
    <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50">
        <span className="font-semibold text-gray-600">Email:</span>
     <span className="text-gray-800">{infodata.email}</span>
    </div>
 </div>

<div className="mt-14 flex flex-col items-center gap-4">
  <div className="flex justify-center gap-6">
    <button onClick={()=>{setView("most")}} className="px-5 py-2 bg-white border border-gray-300 text-gray-700 rounded-full shadow-sm hover:bg-gray-100 transition font-medium">
      Most Applicable Jobs
    </button>
    <button
      onClick={() => { setView("post") }}
      className="px-6 py-2 bg-blue-600 text-white rounded-full shadow-sm hover:bg-blue-700 transition font-medium" > Post Job
    </button>
  </div>
  <div className="w-[calc(100%-40%)] max-w-md text-center px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium shadow-sm">
    Jobs Posted: {jobs.length}
  </div>
</div>

<div className="mt-6">
 {(view==="post"|| view==="most") && <button 
  onClick={()=>{setView("admin")}}
   className="px-6 py-2  bg-gray-400 text-white rounded-full shadow-sm hover:bg-gray-500 transition font-medium">
    Back
  </button> }
  </div>
    </div>
</div>
  </div>
  <div className="col-span-2 mt-8">
   {view==="post" &&  <Postjobs/>}
   {view==="admin" && <Adminposts jobs={jobs} onDelete={handledeletejob}/>}
  {view==="most" && <Mostappliedjobs/>}
  </div>
  </div>
</div>

 </>
    )}

export default Aboutpage;