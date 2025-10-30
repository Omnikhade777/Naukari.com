import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../Config";

const Mostappliedjobs=()=>{
   
    interface mostappliedschema{
        id:string,
        title:string,
        description:string,
        postedAt:string,
        deadline:string,
        isActive:boolean,
        skillsrequired:string[],
        salary:string,
        location:string,
        jobtype:string,
        _count: {
        applications: number;
       };
       mostapplied:[]

    }

 const [jobs,setjobs]=useState<mostappliedschema[]>([]);
 const navigate=useNavigate();

    useEffect(()=>{
     const getmostappliedjobs=async()=>{
     const response =await axios.get<mostappliedschema>(`${BACKEND_URL}/api/v1/adminoperations/stats`,{
        headers:{
            Authorization:localStorage.getItem("admintoken"),
        }
     });
     const {mostapplied}=response?.data;
     setjobs(mostapplied)
     }
   
     getmostappliedjobs();
    },[])

    
    return(
        <>
      <div className="col-span-2 mt-8 flex flex-col h-[80vh]">
       <div className="flex justify-center mb-4">
    <strong className="text-3xl">Trending Jobs</strong></div>
  <div className="flex-1 overflow-y-auto pr-3">
         {jobs.map((a)=>(
          <div key={a.id}
            className="border border-gray-200 rounded-xl p-6 mb-6 shadow-md bg-white hover:shadow-lg transition-shadow duration-200 ease-in-out ">
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-semibold text-blue-700">{a.title}</h2>
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full ${(new Date() <= new Date(a.deadline) )? "bg-green-100 text-green-700": "bg-red-100 text-red-700"}`}>
                {(new Date() <= new Date(a.deadline))? "Active" : "Closed"}
              </span>
            </div>
            <p className="text-gray-700 mt-2">{a.description}</p>
            <div className="flex gap-6 mt-3 text-sm text-gray-500">
              <span>📅 Posted: {new Date(a.postedAt).toLocaleDateString()}</span>
              <span>
                ⏳ Deadline: {new Date(a.deadline).toLocaleDateString()}
              </span>
            </div>
            {a.skillsrequired?.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {a.skillsrequired.map((skill: string, i: number) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                    {skill}
                  </span>
                ))}
              </div> ) : (
              <div className="mt-4 flex flex-wrap gap-2">
         <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                 Strong Communication skills
          </span>
        </div>
            )}
             <div className="flex justify-between items-start">
             <div className="flex flex-wrap gap-6 mt-4 text-sm text-gray-600">
            {a.salary ? (<span>💰 {a.salary}</span>) : (<span>💰 Competitive</span>)}
              {a.location ? (<span>📍 {a.location}</span>) : (<span>📍 All over India</span>)}
           {a.jobtype ? (<span>🧑‍💻 {a.jobtype}</span>) : (<span>🧑‍💻 Remote</span>)}
       </div>
            <span
               className="px-4 py-3 text-xs font-medium rounded bg-blue-100 text-blue-700 cursor-pointer">
               <button  onClick={(e)=>{
            e.stopPropagation();
            navigate("/application",{state:{id:a.id}});

           }}>Numbers of applications : {a._count.applications}</button>
              </span>
            </div>
    </div>
 ))}
  </div>
</div>
        </>
    )
}
export default Mostappliedjobs