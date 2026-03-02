import axios, { AxiosError } from "axios";
import { BookmarkCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate} from "react-router-dom";
import { BACKEND_URL } from "../../Config";

const Similarjobs=()=>{

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

    interface similarjobs{
        message:string,
        findsimilarjobs:[]
    }

 const location=useLocation();
 const jobid=location.state.id;
//  const[messages,setmessages]=useState<string>("");
 const[similarjobs,setsimilarjobs]=useState<jobinfo[]>([]);
 const[isapplymessage,setisapplymessage]=useState<Record<string,string>>({})
 const[savemessage,setsavemessage]=useState<Record<string,string>>({})
 const[recommendjobid,setrecommendjobid]=useState<Record<string,boolean>>({});
 const navigate=useNavigate();
 


   useEffect(()=>{
   const getsimilarjobs=async()=>{
    const response=await axios.get<similarjobs>(`${BACKEND_URL}/api/v1/candidatefeatures/similarjobs/${jobid}`,{
        headers:{
            Authorization:localStorage.getItem("token"),
        }
    });
    console.log(response.data);
    const {findsimilarjobs}=response.data;
    setsimilarjobs(findsimilarjobs);
   }
    getsimilarjobs();
   },[])
  
  
   const handelapply=async(jobid:string)=>{
    try{
    const response=await axios.post(`${BACKEND_URL}/api/v1/candidatehandler/job/apply/${jobid}`,
      {},{
      headers:{
        Authorization:localStorage.getItem("token"),
      }
    })
    const {message}=response.data;
    setisapplymessage((prev) => ({
        ...prev,
      [jobid]: message,
    }));
  }catch(err){
    const error = err as AxiosError<{message:string}>
     setisapplymessage((prev) => ({
        ...prev,
      [jobid]: error.response?.data?.message || "something went wrong",
    }));
    }
}
  
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
     setisapplymessage({});
     setsavemessage({})
  }, 2000);

  return ()=> clearTimeout(timer)
  },[savemessage,isapplymessage])

    return(
        <>
     <div className="flex justify-center mt-12 px-6">    
  <div className="w-full max-w-4xl">
      <div className="flex justify-center px-6">
  <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
    <div className="flex items-center justify-between max-w-4xl mx-auto px-6 py-4">
      <button className="absolute left-0 ml-6 bg-gray-200 px-4 py-2 rounded"onClick={() => navigate("/mainpage")}>
        Back
      </button>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center w-full">💼 Similar Jobs</h1>
        </div>
  </div>
</div>

      {similarjobs.map((a)=>(
    <div
      className="border border-gray-200 rounded-2xl p-8 mt-14 shadow-md bg-gradient-to-r from-blue-50 via-white to-blue-50 hover:shadow-xl hover:scale-[1.01] transition-all duration-300 ease-in-out">
    <>
     <h2 className="text-2xl font-semibold text-blue-700 mb-3">{a.title}</h2>
      <p className="text-gray-600 mb-6 leading-relaxed">{a.description}</p>
      <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm text-gray-700">
        <p>
          <strong>📅 Post Date: </strong>{new Date(a.postedAt).toLocaleString("en-US",{
            month:"short",
            day:"2-digit",
            year:"2-digit"
          })}</p>
        <p><strong>⏳ Deadline:</strong> {new Date(a.deadline).toLocaleString("en-US",{
          month:"short",
          day:"2-digit",
          year:"2-digit"
        })}</p>
        <p><strong>📍 Location: </strong> {a.location ? a.location : "Not Specified"} </p>
        <p>
          <strong>💰 Salary: </strong>{a.salary ? a.salary : "As per company norms"}</p>
        <p>
          <strong>🛠 Skills: </strong>{a.skillsrequired.join(" ,") ? a.skillsrequired.join(" ,") : "strong programming foundation"}</p>
        <p>
          <strong>📂 Job Type: </strong> {a.jobtype ? a.jobtype : "remote"}
        </p>
        <p>
          <strong>✅ Active:</strong>{" "}
          <span className={
                  (new Date() <= new Date(a.deadline)) ? "text-green-600 font-semibold": "text-red-600 font-semibold"}>
                  {(new Date() <= new Date(a.deadline)) ? "Yes" : "No"}
              </span>
        </p>
      </div>
      <div className="mt-6 flex justify-between items-center">
        <div>
              <button
                onClick={() =>  handelapply(a.id)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition duration-200">
                Apply Now
              </button>
               <div className={ isapplymessage[a.id]==="successfully applied for the job" ?
                "mt-3 text-green-500 font-medium"
              :  "mt-3 text-red-500 font-medium"}>
                {isapplymessage[a.id]}
              </div>
            </div>
        
        <div>
          <button
                onClick={() => {
                  setrecommendjobid((prev) => ({
                    ...prev,
                    [a.id]: !prev[a.id],
                  }));
                 handelsave(a.id)
                }}
                className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-5 py-2 rounded-xl border border-blue-300 shadow-sm hover:shadow-md transition-all duration-200">
                {recommendjobid[a.id] &&
                savemessage[a.id] === "job is saved" ? (
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
                savemessage[a.id]==="job is saved" ? "mt-3 text-green-500 font-medium" :
                "mt-3 text-red-500 font-medium"}>
                {savemessage[a.id]}
              </div>
          <div className="mt-3 text-red-500 font-medium"></div>
        </div>
      </div>
</>  
    </div>
       ))}
  </div>
</div>

        </>
    )
}
export default Similarjobs;