import axios from "axios";
import { Bookmark } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../Config";

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
  const navigate=useNavigate();

  useEffect(()=>{
   const allsavedjobs=async()=>{
    const response=await axios.get(`${BACKEND_URL}/api/v1/candidatefeatures/getallsavedjobs`,{
      headers:{
        Authorization:localStorage.getItem("token"),
      }
    });
    setallsavedjobsids(response.data.getsavedjobs);

   }
   allsavedjobs();
  },[]);

  const deletesaved=async(id:string)=>{
     await axios.delete(`${BACKEND_URL}/api/v1/candidatefeatures/deletesavejobs/${id}`,{
      headers:{
        Authorization:localStorage.getItem("token")
     }
  });
  setallsavedjobsids(allsavedjobsids.filter((j)=>j.jobId !== id));
  }
  return (
    <>
      <div className="flex justify-center mt-12 px-6">
        <div className="w-full max-w-5xl">
      <div className="flex justify-center px-6">
  <div className=" fixed  top-0 left-0 right-0 bg-white shadow-md z-50">
    <div className="flex items-center justify-between max-w-4xl mx-auto px-6 py-4">
      <button className=" absolute left-0 ml-6 bg-gray-200 px-4 py-2  rounded"onClick={() => navigate("/mainpage")}>
        Back
      </button>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center w-full">💼 Saved Jobs</h1>
        </div>
  </div>
</div>
          <div className="space-y-8">
           {allsavedjobsids?.length>0 ? allsavedjobsids.map((a:any)=>(
             <div key={a.job.id} className="border border-gray-200 rounded-xl p-6 mt-16 shadow-md cursor-pointer bg-white hover:shadow-lg transition-shadow duration-200 ease-in-out">
              <h2 className="text-xl font-semibold text-blue-700 mb-3">
                {a.job.title}
              </h2>
              <p className="text-gray-600 mb-4">{a.job.description}</p>

              <div className="grid grid-cols-1 gap-2 text-sm text-gray-700 sm:grid-cols-2" onClick={()=>{
              navigate("/mainpage",{state:{id:a.job.id}})
             }} >
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
                  <span
                className={
                  (new Date() <= new Date(a.job.deadline)) ? "text-green-600 font-semibold": "text-red-600 font-semibold"}>
                  {(new Date() <= new Date(a.job.deadline)) ? "Yes" : "No"}
              </span>
                </p>
              </div>

              <div className="mt-4 text-center">
                <button
                onClick={()=>{
                  deletesaved(a.jobId);
                }}
                 className="bg-red-600 hover:bg-red-400 text-white ml-[500px] px-5 py-2 rounded-lg shadow-sm transition-colors duration-200">
                  Delete
                </button>
              </div>
            </div>
           )) : ( <div className="flex flex-col items-center justify-center text-center bg-white border border-gray-200 rounded-2xl shadow-md p-10 max-w-lg mx-auto mt-10">
      <Bookmark className="w-16 h-16 text-green-600 mb-4" />
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        No Saved Jobs
      </h2>
      <p className="text-gray-600 mb-6">
        You haven’t saved any jobs yet. Browse jobs and save the ones you’re
        interested in to apply later.
      </p>
      <button
      onClick={()=>{navigate("/mainpage")}} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full shadow transition">
        Explore Jobs
      </button>
    </div>)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Savedjobs;
