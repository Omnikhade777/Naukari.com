import axios from "axios";
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
 setapplications(response.data.alljobs.map((j:any) => j.job));
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
      <h1 className="text-3xl font-bold mb-8 mt-9 text-center text-gray-800">
        💼 No Applied jobs
      </h1>
    );
  }
    return (
        <>
        
<div className="flex justify-center mt-10 px-4">
    <div><button className="bg-gray-200 px-4 py-2 mr-8 rounded" onClick={()=>{navigate("/mainpage")}}> back </button></div>
  <div className="w-full max-w-5xl">
    <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
      💼 Applied Jobs
    </h1>

    <div className="grid gap-6 md:grid-cols-2">
      {applications.map((job) => (
        <div
          key={job.id}
          className="border border-gray-200 rounded-xl p-6 shadow-md bg-white hover:shadow-lg transition-shadow duration-200 ease-in-out"
        >
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
                className={job.isActive ? "text-green-600 font-medium" : "text-red-500"}
              >
                {job.isActive ? "Yes" : "No"}
              </span>
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