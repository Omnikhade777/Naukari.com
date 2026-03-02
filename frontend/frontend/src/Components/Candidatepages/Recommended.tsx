import { BookmarkCheck, Briefcase, Search } from "lucide-react";
import UseRecommend from "../../hooks/UseRecommend";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../Config";

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
   const {recommendjobs}=UseRecommend<jobinfo>();
    const navigate=useNavigate();

      const handleisapply=async(jobiid:string)=>{
      try{
       const response= await axios.post<response>(
      `${BACKEND_URL}/api/v1/candidatehandler/job/apply/${jobiid}`,
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
   const response=await axios.post(`${BACKEND_URL}/api/v1/candidatefeatures/savejobs`,{
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
     <div className="flex justify-center px-6">
  <div className=" fixed  top-0 left-0 right-0 bg-white shadow-md z-50">
    <div className="flex items-center justify-between max-w-4xl mx-auto px-6 py-4">
      <button className=" absolute left-0 ml-6 bg-gray-200 px-4 py-2  rounded"onClick={() => navigate("/mainpage")}>
        Back
      </button>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center w-full">💼Recommended Jobs</h1>
        </div>
  </div>
</div>
    <div className="space-y-8 mt-14">
      {recommendjobs?.length>0 ? recommendjobs.map((j) => (
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
                  (new Date() <= new Date(j.deadline)) ? "text-green-600 font-semibold": "text-red-600 font-semibold"}>
                  {(new Date() <= new Date(j.deadline)) ? "Yes" : "No"}
              </span>
            </p>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <div>
              <button
                onClick={() => handleisapply(j.id)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition duration-200">
                Apply Now
              </button>
               <div className={ JobMessages[j.id]==="successfully applied for the job" ?
                "mt-3 text-green-500 font-medium": "mt-3 text-red-500 font-medium"}>
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
      )) :(
    <div className="flex flex-col items-center justify-center text-center bg-white border border-gray-200 rounded-2xl shadow-md p-10 max-w-lg mx-auto mt-10">
      <Briefcase className="w-16 h-16 text-blue-600 mb-4" />
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        No Recommended Jobs
      </h2>
      <p className="text-gray-600 mb-6">
        It looks like there are no job recommendations available for you right
        now. Update your profile or search for jobs to get better matches.
      </p>
      <button  onClick={()=>{navigate("/update/profile");}} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow transition">
        <Search className="w-4 h-4" />
        Update profile
      </button>
    </div>
  )}
    </div>
  </div>
</div>

  </>
);
}

export default Recommended;