import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

const Postjobs=()=>{

  const [title,settitle]=useState<string>("");
  const [description,setdescription]=useState("");
  const [postedAt,setpostedAt]=useState<string>("")
  const [deadline,setdeadline]=useState<string>("")
  const [skillsrequired,setskillsrequired]=useState<string[]>([])
  const [salary,setsalary]=useState<string>("")
  const [location,setlocation]=useState<string>("")
  const [jobtype,setjobtype]=useState<string>("")
  const [message,setmessage]=useState<string>("");
  const [loading,setloading]=useState<boolean>(false); 
  
  const postjob=async(e: React.FormEvent)=>{
     e.preventDefault();
     try{
      setloading(true)
    const response=await axios.post("http://localhost:3000/api/v1/adminjobhandler/jobpost",{
      title,
      description,
      postedAt,
      deadline,
      skillsrequired,
      salary,
      location,
      jobtype
    },{
      headers:{
        Authorization:localStorage.getItem("admintoken")
      }
    });
      
   const {message}=response.data;
   setmessage(message);
   setloading(false);
  }catch(err){
    const error=err as AxiosError<{message:string}>
    setmessage(error.response?.data?.message || "something went wrong")
    setloading(false);
  }
}

useEffect(()=>{
  const timer=setTimeout(() => {
    setmessage("")
  }, 2000);
  
  return()=> clearTimeout(timer);
},[message])


    return(
    <>
       <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-6 mb-6 border border-gray-200">
  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Post a Job</h2>
  <form className="space-y-5">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
      <input 
      onChange={(e)=>{
        settitle(e.target.value);
      }}
      type="text"
        placeholder="e.g. UI/UX Designer"
        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
      <textarea
      onChange={(e)=>{
        setdescription(e.target.value);
      }}
        placeholder="Write a short description of the role..."
        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Posted Date</label>
        <input
        onChange={(e)=>{
        setpostedAt(e.target.value);
      }}
      type="date"
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
        <input
        onChange={(e)=>{
        setdeadline(e.target.value);
      }}
          type="date"
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
      </div>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Skills Required</label>
      <input
      onChange={(e)=>{
        setskillsrequired(e.target.value.split(",").map((a)=>a.trim()));
      }}
        type="text"
        placeholder="e.g. Figma, Wireframing, Prototyping"
        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
      <p className="text-xs text-gray-500 mt-1">Separate skills with commas</p>
    </div>
    <div className="grid grid-cols-1 mt-3 sm:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
        <input
        onChange={(e)=>{
        setlocation(e.target.value);
      }}
          type="text" placeholder="e.g. Remote"
          className="w-full mt-3 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
        <select
        onChange={(e)=>{
        setjobtype(e.target.value);
      }}
          className="w-full mt-3 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none">
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Internship</option>
          <option>Contract</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
        <input
        onChange={(e)=>{
        setsalary(e.target.value);
      }}
          type="text"
          placeholder="e.g. 8 LPA"
          className="w-full px-4 mt-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
      </div>
    </div>
    <div className="pt-4">
      <button onClick={postjob} type="submit"
        className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition">
        {loading ? "posting...." : "Post Job"}
      </button>
    </div>
    <div className=" flex justify-center">
     <div className={ message==="jobs are created successfully !" ? "mt-3 text-green-500 font-medium" : "mt-3 text-red-500 font-medium"}>
        {message}
    </div>
    </div>
    
  </form>
</div>
        </>
    )
}
export default Postjobs;