import axios from "axios";
import { Briefcase, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Myapplications=()=>{

interface jobs{
    id:string,
    title:string,
    description:string,
    postedAt:string,
    deadline:string,
    isActive:Boolean,
    skillsrequired:string[],
    salary:string,
    location:string,
    jobtype:string
    appliedAt:string,
    status:string
}
const [applications,setapplications]=useState<jobs[]>([]);

const navigate=useNavigate();

  

useEffect(()=>{
const myapplications=async()=>{
 const response=await axios.get("http://localhost:3000/api/v1/candidatehandler/myallapplicatons",{
    headers:{
        Authorization:localStorage.getItem("token"),
    }
 });
setapplications(response.data.alljobs.map((j: any) => ({
    ...j.job,              
    appliedAt: j.appliedAt,
    status: j.status
  }))
   ); 
}

myapplications();

},[])


 const deleteapplication=async(jobid:string)=>{
    await axios.delete(`http://localhost:3000/api/v1/candidatehandler/job/delete/${jobid}`,{
     headers:{
        Authorization:localStorage.getItem("token"),
    }} );

    setapplications(applications.filter((job)=>job.id !==jobid));
}

 if (applications.length === 0) {
    return (
      <>
       <h1 className="text-3xl font-bold mb-8 mt-9 text-center text-gray-800">
        💼 No Applied jobs
      </h1>
       <div className="flex flex-col items-center justify-center text-center bg-white border border-gray-200 rounded-2xl shadow-md p-10 max-w-lg mx-auto mt-10">
      <Briefcase className="w-16 h-16 text-blue-600 mb-4" />
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        No Applied Jobs
      </h2>
      <p className="text-gray-600 mb-6">
       You haven’t applied for any jobs yet. Browse jobs and apply the ones you’re
        interested in .
      </p>
      <button  onClick={()=>{navigate("/mainpage");}} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow transition">
        <Search className="w-4 h-4" />
        Explore Jobs
      </button>
    </div>
      </>
      
    );
  }
    return (
        <>
        
<div className="flex justify-center mt-10 px-4">
  <div className="w-full max-w-5xl">
   <div className="flex justify-center px-6">
  <div className=" fixed  top-0 left-0 right-0 bg-white shadow-md z-50">
    <div className="flex items-center justify-between max-w-4xl mx-auto px-6 py-4">
      <button className=" absolute left-0 ml-6 bg-gray-200 px-4 py-2  rounded"onClick={() => navigate("/mainpage")}>
        Back
      </button>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center w-full">💼Applied Jobs</h1>
        </div>
  </div>
</div>
    <div className="grid gap-6 md:grid-cols-2 mt-14">
      {applications.map((job) => (
        <div
          key={job.id}
          className="border border-gray-200 rounded-xl p-6 shadow-md bg-white hover:shadow-lg transition-shadow duration-200 ease-in-out">
          <h2 className="text-xl font-semibold text-blue-700 mb-3">{job.title}</h2>
          <p className="text-gray-600 mb-4">{job.description}</p>

          <div className="grid grid-cols-1 gap-2 text-sm text-gray-700 sm:grid-cols-2">
            <p>
              <strong>📅 Post Date:</strong>{" "}
              {new Date(job.postedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
            <p>
              <strong>⏳ Deadline:</strong>{" "}
              {new Date(job.deadline).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
            <p>
              <strong>📍 Location:</strong> {job.location || "Not specified"}
            </p>
            <p>
              <strong>💰 Salary:</strong> {job.salary || "Not specified"}
            </p>
            <p>
              <strong>🛠 Skills:</strong> {job.skillsrequired.length ? job.skillsrequired.join(", ") : "None"}
            </p>
            <p>
              <strong>📂 Job Type:</strong> {job.jobtype || "Not specified"}
            </p>
            <p>
              <strong>✅ Active:</strong>{" "}
              <span
                className={(new Date() <= new Date(job.deadline)) ? "text-green-600 font-medium" : "text-red-500 font-medium"}>
                {(new Date() <= new Date(job.deadline)) ? "Yes" : "No"}
              </span>
            </p>
            <p>
              <strong>📅Applied date: </strong>{job.appliedAt.split("T")[0]}
            </p>
             <p>
              <strong>📌Status: </strong><span className={job.status === "PENDING"? "text-yellow-500 font-medium": job.status === "REJECTED" ? "text-red-500 font-medium"
      : "text-green-500 font-medium" }>{job.status}</span>
            </p>
          </div>
          <div className="mt-4 text-center">
            <button
             onClick={()=>{
                deleteapplication(job.id);
             }}
             className="bg-red-600 hover:bg-red-400 text-white px-5 py-2 rounded-lg shadow-sm transition-colors duration-200">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

        </>
    )
  
}
export default Myapplications;