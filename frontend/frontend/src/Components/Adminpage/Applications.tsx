import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Shimmer from "../Shimmer";
import { BACKEND_URL } from "../../Config";

const Applications=()=>{
    const location=useLocation();
    const id=location.state.id;
    const navigate=useNavigate()
    const [applicationinfo,setapplicationinfo]=useState<any>([]);
    const[message,setmessage]=useState<any>({});
    const [loading,setloading]=useState<boolean>(false)
    

    useEffect(()=>{
     const getapplicationdata=async()=>{
      setloading(true)
        const response=await axios.get(`${BACKEND_URL}/api/v1/adminoperations/job-applications/${id}`,{
            headers:{
                Authorization:localStorage.getItem("admintoken"),
            }
        });
        const {getalljobapplications}=response?.data;
      setapplicationinfo(getalljobapplications.applications);
      setloading(false)
     }
     getapplicationdata();
    },[id]);
  
  const handlestate=async(jobid:string,candidateid:string,state:string)=>{
    try{
    const response=await axios.post(`${BACKEND_URL}/api/v1/adminoperations/handleapplicationstatus/${jobid}/${candidateid}`,{
       status:state,
    },{
      headers:{
        Authorization:localStorage.getItem("admintoken")
      }
    });
    const {message}=response.data;
    setmessage((prev:any)=>({
      ...prev,
    [jobid]:message}));
    }catch(err){
      const error=err as AxiosError<{message:string}>
      setmessage((prev:any)=>({
        ...prev,
        [jobid]:error.response?.data?.message || "something went wrong"
      }))
    }
  }

  useEffect(()=>{
 const timer=setTimeout(()=>{
  setmessage({})
 },2000);
 return ()=>clearTimeout(timer);

  },[message]);

   if(loading){
  return(<>
   <div className="pt-20 px-4 bg-gradient-to-br from-gray-50 to-white min-h-screen">
          <div className="max-w-3xl mx-auto space-y-6">
            {Array(4)
              .fill(0)
              .map((_, indx) => (
                <Shimmer key={indx} />
              ))}
          </div>
        </div>
        </>
        )
 }
    return(
<>
  <div className="h-screen flex flex-col">
  <div className="flex items-center justify-between px-6 py-6 border-b bg-white shadow-md">
    <button onClick={() => navigate(-1)}
     className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-gray-300 hover:bg-gray-200 transition">
       Back
     </button>
 <h1 className="text-3xl font-bold text-gray-800">Applicants</h1>
<div className="w-16" />
  </div>
  <div className="flex-1 overflow-y-auto px-6">
    {applicationinfo.map((a: any) => (
      <div key={a.id} className="flex justify-center mt-5">
<div className="bg-white rounded-2xl w-[70%] shadow-md hover:shadow-xl transition-all duration-300 p-6 mb-6 border border-gray-100">
    <div className="flex items-center justify-between">
    <div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow">
     {a.candidate.name[0].toUpperCase()}</div>
<div>
<h2 className="text-lg font-semibold text-gray-800"> {a.candidate.name}</h2>
    <p className="text-sm text-gray-500">{a.candidate.email}</p>
    </div>
    </div>
    <span className="text-xs px-4 py-1 bg-green-100 text-green-700 rounded-full font-medium shadow-sm">
 Applied on {a.appliedAt.split("T")[0]}</span>
</div>
    <div className="mt-5 grid grid-cols-2 gap-4 text-sm text-gray-700">
    <div className="bg-gray-50 p-3 rounded-lg border">
<span className="block text-gray-400 text-xs">Application ID</span>
    <span className="font-medium">{a.id}</span></div>
    <div className="bg-gray-50 p-3 rounded-lg border">
     <span className="block text-gray-400 text-xs">Job ID</span>
<span className="font-medium">{a.jobId}</span></div>
            <div className="bg-gray-50 p-3 rounded-lg border">
              <span className="block text-gray-400 text-xs">Candidate ID</span>
    <span className="font-medium">{a.candidateId}</span>
 </div>
     </div>
    <div className="mt-6 flex gap-3 justify-end">
     <button onClick={()=>{handlestate(a.jobId,a.candidateId,"ACCEPTED");}} className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md transition text-sm"> Accept
            </button>
     <button onClick={()=>{handlestate(a.jobId,a.candidateId,"REJECTED");}} className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition text-sm"> Reject
            </button>
  
</div>
<div className="mt-6 flex gap-3 mr-7 justify-end">
  <span className={message[a.jobId]==="Status sent"? "mt-3 text-green-500 font-medium" : " mt-3 text-red-500 font-medium"}>{message[a.jobId]}</span>
</div>

     </div>
</div> ))}
    </div>
</div>


        </>
    )
}
export default Applications;