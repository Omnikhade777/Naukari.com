import { BookmarkCheck } from "lucide-react";
import UseRecommend from "../../hooks/UseRecommend";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

const Recommended=()=>{
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
        isActive:Boolean
    }
interface response{
      message:string,
      jobid:string
    }
   const [JobMessages,setJobMessages]=useState<Record<string,string>>({});
   const [recommendjobid,setrecommendjobid]=useState<Record<string,boolean>>({});
    const [savemessage,setsavemessage]=useState<Record<string,string>>({});
   const {recommendjobs,message}=UseRecommend<jobinfo>();


      const handleisapply=async(jobiid:string)=>{
      try{
       const response= await axios.post<response>(
      `http://localhost:3000/api/v1/candidatehandler/job/apply/${jobiid}`,
      {}, 
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    const {message}=response.data;
       setJobMessages((prev) => ({
        ...prev,
      [jobiid]: message,
    }));
  }catch(err){
   const error=err as AxiosError<{message:string}>
   setJobMessages((prev) => ({
      ...prev,
      [jobiid]: error.response?.data?.message || "something went wrong",
    }));
  }};
   
const handelsave=async(jobsaveid:string)=>{
  try{
   const response=await axios.post("http://localhost:3000/api/v1/candidatefeatures/savejobs",{
    jobid:jobsaveid
   },{
    headers:{
      Authorization:localStorage.getItem("token"),
    }
   });
   const {message}=response.data;
  
   setsavemessage((prev)=>({
    ...prev,
    [jobsaveid]:message
   }))
  }catch(err){
   const error=err as AxiosError<{message:string}>
   setsavemessage((prev)=>({
    ...prev,
    [jobsaveid]:error.response?.data?.message || "something went wrong"
   }))
  }

}
    
useEffect(()=>{
  const timer=setTimeout(() => {
    setJobMessages({}),
    setsavemessage({})

  },2000);

  return ()=>clearTimeout(timer);
})
    
return (
  <>
  <div className="flex justify-center mt-12 px-6">
  <div className="w-full max-w-5xl">
    <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
      🌟 Recommended Jobs
    </h1>
    <div className="space-y-8">
      {recommendjobs.map((j) => (
        <div
          key={j.id}
          className="border border-gray-200 rounded-2xl p-8 shadow-md bg-gradient-to-r from-blue-50 via-white to-blue-50 hover:shadow-xl hover:scale-[1.01] transition-all duration-300 ease-in-out"
        >
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">{j.title}</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">{j.description}</p>

          <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm text-gray-700">
            <p>
              <strong>📅 Post Date:</strong>{" "}
              {new Date(j.postedAt).toLocaleString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
            <p>
              <strong>⏳ Deadline:</strong>{" "}
              {new Date(j.deadline).toLocaleString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
            <p>
              <strong>📍 Location:</strong> {j.location}
            </p>
            <p>
              <strong>💰 Salary:</strong> {j.salary}
            </p>
            <p>
              <strong>🛠 Skills:</strong> {j.skillsrequired.join(", ")}
            </p>
            <p>
              <strong>📂 Job Type:</strong> {j.jobtype}
            </p>
            <p>
              <strong>✅ Active:</strong>{" "}
              <span
                className={
                  j.isActive
                    ? "text-green-600 font-semibold"
                    : "text-red-600 font-semibold"
                }
              >
                {j.isActive ? "Yes" : "No"}
              </span>
            </p>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <div>
              <button
                onClick={() => handleisapply(j.id)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition duration-200"
              >
                Apply Now
              </button>
               <div className={ JobMessages[j.id]==="successfully applied for the job" ?
                "mt-3 text-green-500 font-medium"
              :  "mt-3 text-red-500 font-medium"}>
                {JobMessages[j.id]}
              </div>
            </div>

            <div>
              <button
                onClick={() => {
                  setrecommendjobid((prev) => ({
                    ...prev,
                    [j.id]: !prev[j.id],
                  }));
                  handelsave(j.id);
                }}
                className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-5 py-2 rounded-xl border border-blue-300 shadow-sm hover:shadow-md transition-all duration-200"
              >
                {recommendjobid[j.id] &&
                savemessage[j.id] === "job is saved" ? (
                  <>
                    <BookmarkCheck className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-700">Saved</span>
                  </>
                ) : (
                  <>
                    <BookmarkCheck className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold">Save</span>
                  </>
                )}
              </button>
              <div className={
                savemessage[j.id]==="job is saved" ? "mt-3 text-green-500 font-medium" :
                "mt-3 text-red-500 font-medium"}>
                {savemessage[j.id]}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

  </>
);
}

export default Recommended;