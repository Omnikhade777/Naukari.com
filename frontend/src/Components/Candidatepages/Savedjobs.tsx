import axios from "axios";
import { useEffect, useState } from "react";

const Savedjobs = () => {
   interface jobinfo{
        id:string,
        title:string,
        description:string,
        postedAt:string,
        deadline:string,
        skillsrequired:string[],
        salary:string,
        location:string,
        jobtype:string,
        isActive:Boolean,
        candidateId:string,
        savedAt:string,
        jobId:string

    }
  const [allsavedjobsids,setallsavedjobsids]=useState<jobinfo[]>([]);

  useEffect(()=>{
   const allsavedjobs=async()=>{
    const response=await axios.get("http://localhost:3000/api/v1/candidatefeatures/getallsavedjobs",{
      headers:{
        Authorization:localStorage.getItem("token"),
      }
    });
    setallsavedjobsids(response.data.getsavedjobs);

   }
   allsavedjobs();
  },[]);

  const deletesaved=async(id:string)=>{
     await axios.delete(`http://localhost:3000/api/v1/candidatefeatures/deletesavejobs/${id}`,{
      headers:{
        Authorization:localStorage.getItem("token")
     }
  });
  setallsavedjobsids(allsavedjobsids.filter((j)=>j.jobId !== id));
  }
  return (
    <>
      <div className="flex justify-center mt-10 px-4">
        <div className="w-full max-w-5xl">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
            💼 Saved Jobs
          
          </h1>

          <div className="grid gap-6 md:grid-cols-2">
           {allsavedjobsids.map((a:any)=>(
             <div className="border border-gray-200 rounded-xl p-6 shadow-md bg-white hover:shadow-lg transition-shadow duration-200 ease-in-out">
              <h2 className="text-xl font-semibold text-blue-700 mb-3">
                {a.job.title}
              </h2>
              <p className="text-gray-600 mb-4">{a.job.description}</p>

              <div className="grid grid-cols-1 gap-2 text-sm text-gray-700 sm:grid-cols-2">
                <p>
                  <strong>📅 Post Date:{" "}</strong> {new Date(a.job.postedAt).toLocaleString("en-Us",{
                    year:"numeric",
                    month:"2-digit",
                    day:"numeric"
                  })}
                </p>
                <p>
                  <strong>⏳ Deadline:{" "}</strong>{new Date(a.job.deadline).toLocaleString("en-Us",{
                    year:"numeric",
                    month:"2-digit",
                    day:"numeric"
                  })}
                </p>
                <p>
                  <strong>📍 Location:</strong> {a.job.location}
                </p>
                <p>
                  <strong>💰 Salary:</strong>{a.job.salary}
                </p>
                <p>
                  <strong>🛠 Skills:</strong> {a.job.skillsrequired.join(", ")}
                </p>
                <p>
                  <strong>📂 Job Type:</strong> {a.job.jobtype}
                </p>
                <p>
                  <strong>✅ Active:</strong>{" "}
                  <span className="text-green-600 font-medium">{a.job.isActive}</span>
                </p>
              </div>

              <div className="mt-4 text-center">
                <button
                onClick={()=>{
                  deletesaved(a.jobId);
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
  );
};

export default Savedjobs;
