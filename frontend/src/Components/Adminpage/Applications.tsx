import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Applications=()=>{
    const location=useLocation();
    const id=location.state.id;
    const [applicationinfo,setapplicationinfo]=useState<any>([]);

    useEffect(()=>{
     const getapplicationdata=async()=>{
        const response=await axios.get(`http://localhost:3000/api/v1/adminoperations/job-applications/${id}`,{
            headers:{
                Authorization:localStorage.getItem("token"),
            }
        });
        const {getalljobapplications}=response?.data;
      setapplicationinfo(getalljobapplications.applications);
     }
     getapplicationdata();
    },[id]);
  
    return(
<>
  <div className="h-screen flex flex-col">
  <div className="flex items-center justify-between px-6 py-6 border-b bg-white shadow-md">
    <button onClick={() => window.history.back()}
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
 <button className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition text-sm"> View
            </button>
    <button className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md transition text-sm"> Accept
            </button>
<button className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition text-sm"> Reject
            </button>
</div>
     </div>
</div> ))}
    </div>
</div>


        </>
    )
}
export default Applications;