import axios, { AxiosError } from "axios";
import Usefetchpost from "../../hooks/Usefetchpost";
import Header from "./Header";
import Profile from "./Profile";
import { useEffect, useState } from "react";
import Footerbar from "./Footerbar";
import { BookmarkCheck, Search } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
const Mainpage=()=>{

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
    const [jobMessages, setJobMessages] = useState<Record<string, string>>({});
    const [jobid,setjobid]=useState("");
     const { jobs: allJobs } = Usefetchpost<jobinfo>();
      const [jobs, setJobs] = useState<jobinfo[]>([]);

    const [savedJobs, setSavedJobs] = useState<Record<string, boolean>>({});
    const [savemessage,setsavemessage]=useState<Record<string,string>>({});
    const [searchitem,setsearchitem]=useState<string>("");
    const [searchmessage,setsearchmessage]=useState<string>("");
    const[satejobid,setsatejobid]=useState<string>("");
    const navigate=useNavigate();
    const location=useLocation();
    const jobiid=location.state?.id || "";
     
  useEffect(() => {
  if (jobiid) {
    setsatejobid(jobiid);
  }
}, [location.state]);
     


//initially load all the jobs and the update the state  
useEffect(() => {
setJobs(allJobs);
}, [allJobs]);

//after clicking on the savejob it will update the samestate to the filter job
useEffect(() => {
  if (satejobid && allJobs.length > 0) {
    const filtered = allJobs.filter((a) => a.id === satejobid);
    setJobs(filtered);
  }
}, [satejobid, allJobs]);

//reupdate the state of jobs when handleback will trigger
const handleback = () => {
  setJobs(allJobs); 
  setsatejobid("");
};




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

    const {message,jobid}=response.data;
       setJobMessages((prev) => ({
        ...prev,
      [jobiid]: message,
    }));
    setjobid(jobid);
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
    setJobMessages({});
    setsavemessage({});
   }, 2000);
   return ()=>clearTimeout(timer)
},[jobMessages,savemessage]);

useEffect(()=>{
   if (!searchitem) {
    setJobs(allJobs); 
    return;
  }
    const timer=setTimeout(async() => {
      try{
      const response=await axios.get("http://localhost:3000/api/v1/candidatefeatures/filterjobs",{
      params: { title:searchitem , location:searchitem },
      headers: { 
        Authorization: localStorage.getItem("token") 
      },
    }
  );
  const {searchjobs,message}=response.data;
  setJobs(searchjobs)
  setsearchmessage(message)
}catch(err){
const error=err as AxiosError<{message:string}>
setsearchmessage(error.response?.data?.message || "something went wrong")

}
    },1500);

return ()=> clearTimeout(timer);

},[searchitem]);

useEffect(()=>{
 const timer=setTimeout(() => {
  setsearchmessage("")
 },3000);

 return ()=> clearTimeout(timer);

},[searchmessage])



return (
  <>
  <div className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
    <Header trigger={handleback}/>
  </div>
<div className="flex-1 mt-28 px-8 fixed top-0 left-0 w-full z-50">
  <div className="w-full max-w-md mx-auto">
<div className="relative">
  <span className="absolute inset-y-0 left-4 flex items-center"> <Search className="text-gray-500" size={20} /></span>
  <input onChange={(e) => setsearchitem(e.target.value)}
        type="text"
        placeholder="Search jobs, Role, or location..."
        className="w-full pl-12 pr-4 py-2.5 rounded-full border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"/>
  </div>
<div className="mt-2 text-center text-red-600">{searchmessage} </div>
  </div>
</div>

  <div>
  <div className="flex gap-6 mt-36 max-w-7xl py-16 mx-auto px-4">
  <div className="flex-1">
    <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
      💼 Job Listings
    </h1>
    {jobs.length>0 ? jobs.map((job) => (
      <div
        key={job.id}
        className="border border-gray-200 rounded-xl p-6 mb-6 shadow-md bg-white hover:shadow-lg transition-shadow duration-200 ease-in-out"
      >
        <h2 className="text-xl font-semibold text-blue-700 mb-2">{job.title}</h2>
        <p className="text-gray-600 mb-4">{job.description}</p>
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm text-gray-700">
          <p>
            <strong>📅 Post Date:</strong>{" "}
            {new Date(job.postedAt).toLocaleString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
          <p>
            <strong>⏳ Deadline:</strong>{" "}
            {new Date(job.deadline).toLocaleString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
          <p>
            <strong>📍 Location:</strong> {job.location}
          </p>
          <p>
            <strong>💰 Salary:</strong> {job.salary}
          </p>
          <p>
            <strong>🛠 Skills:</strong> {job.skillsrequired.join(", ")}
          </p>
          <p>
            <strong>📂 Job Type:</strong> {job.jobtype}
          </p>
          <p>
            <strong>✅ Active:</strong>{" "}
            <span
              className={
                job.isActive ? "text-green-600 font-medium" : "text-red-500"
              }
            >
              {job.isActive ? "Yes" : "No"}
            </span>
          </p>
        </div>
        <div className="mt-4 flex">
          <div>
          <button
          onClick={()=>{
            handleisapply(job.id);
          }}
           className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 mt-2 rounded-lg shadow-sm transition-colors duration-200">
           {jobid===job.id ? "Applied" : "Apply Now"}
          </button>
          </div>
          
          <div>
          <button
  onClick={() => {
    handelsave(job.id);
    setSavedJobs((prev) => ({
      ...prev,
      [job.id]: !prev[job.id], 
    }));
  }}
  className="flex items-center gap-2 ml-60 bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-lg border border-blue-300 shadow-sm transition"
>
  {savedJobs[job.id] && savemessage[job.id]==="job is saved" ? (
    <>
      <BookmarkCheck className="w-5 h-5 text-green-600" />
      Saved
    </>
    
  ) : (
    <>
      <BookmarkCheck className="w-5 h-5 text-blue-600" />
      Save
    </>
  )}
     </button>
     <div className={savemessage[job.id]==="job is saved" ? "ml-56 mt-4 text-green-500" : "ml-56 mt-4 text-red-500"}>{savemessage[job.id]}</div>
    </div>

        </div>
        <div className={jobMessages[job.id]==="successfully applied for the job" ? "mt-6 text-green-500":"mt-6 text-red-500"}>{jobMessages[job.id]} </div>
     <div className="border-t border-gray-200 mt-8 pt-4">
  <h2
  onClick={()=>{
   navigate("/similarjobs",{state:{id:job.id}});
  }} 
  className="text-base font-semibold text-gray-800 cursor-pointer">
    Similar jobs
  </h2>
</div>
</div>
    )) : "no jobs"}

  </div>
    <div className="sticky top-24 h-fit w-[400px] bg-white rounded-lg ml-20 p-4">
      <Profile />
    </div>
  </div>
  </div>
 <div className="bg-white shadow-md fixed bottom-0 left-0 w-full z-50 h-16">
  <Footerbar/>
</div>
</>

);

}
export default Mainpage;