import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../Candidatepages/Header";
import Problem from "../Problem";
import { useNavigate } from "react-router-dom";
import Shimmer from "../Shimmer";

const Landingpage=()=>{

    interface alljobposts{
    id:string,
    title:string,
    description:string,
    postedAt:string,
    deadline:string,
    isActive:boolean,
    adminId:string,
    skillsrequired:string[],
    salary:string|null,
    location:string|null,
    jobtype:string|null
    }

    const [alljobs,setalljobs]=useState<alljobposts[]>([]);
    const navigate =useNavigate();
    const [loading,setloading]=useState<boolean>(false);
    useEffect(()=>{
        try{
        const getalljobs=async()=>{
          setloading(true)
        const response=await axios.get("http://localhost:3000/api/v1/adminjobhandler/alljobpost");
        const {posts }=response.data;
        setalljobs(posts);
        setloading(false)
       
        }

       getalljobs();
      }catch(err){
       console.log(err);
         setloading(false)
      }
    },[]);
    
 if(loading){
  return(<>
    <Header handelabout={()=>{navigate("/aboutadmin")}}/>
   <div className="pt-20 px-4 bg-gradient-to-br from-gray-50 to-white min-h-screen">
          <div className="max-w-3xl mx-auto space-y-6">
            {Array(4)
              .fill(0)
              .map((_, indx) => (
                <Shimmer key={indx} />
              ))}
          </div>
        </div>
        </>
        )
 }
   if (alljobs.length <= 0) {
    return <Problem/>;
    }
    return (
        <>
    <div className="fixed top-0 left-0 w-full z-50 bg-white shadow">
       <Header handelabout={()=>{navigate("/aboutadmin")}}/>
     </div>
        <div>
            <div className="flex justify-center mt-11 ">
             <strong className="text-3xl mt-16 ">
                All job posts
            </strong>
            </div>
             <div className=" p-3 mt-9 shadow-md">
             { alljobs.map((a)=>(
            <div className="border border-gray-200 rounded-xl p-6 mb-6 shadow-md bg-white hover:shadow-lg transition-shadow duration-200 ease-in-out">
        <div className="flex justify-between items-start">
    <h2 className="text-xl font-semibold text-blue-700">{a.title}</h2>
    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
       (new Date() <= new Date(a.deadline)) ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
      {(new Date() <= new Date(a.deadline)) ? "Active" : "Closed"}
    </span>
  </div>
  <p className="text-gray-700 mt-2">{a.description}</p>
  <div className="flex gap-6 mt-3 text-sm text-gray-500">
    <span>📅 Posted: {new Date(a.postedAt).toLocaleDateString()}</span>
    <span>⏳ Deadline: {new Date(a.deadline).toLocaleDateString()}</span>
  </div>
  {a.skillsrequired?.length > 0 ? (
    <div className="mt-4 flex flex-wrap gap-2">
      {a.skillsrequired.map((skill: string, i: number) => (
        <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
          {skill}
        </span>
      ))}
    </div>
  ):<div className="mt-4 flex flex-wrap gap-2">
  <span  className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
       Strong Communication skills
        </span>  </div>}
  <div className="flex flex-wrap gap-6 mt-4 text-sm text-gray-600">
    {a.salary ? <span>💰 {a.salary}</span> : <span>💰Competitive</span> }
    {a.location ? <span>📍 {a.location}</span> :  <span>📍All over India</span>}
    {a.jobtype ? <span>🧑‍💻 {a.jobtype}</span> :<span> 🧑‍💻remote</span>}
  </div>
</div>
))}
    </div>
    </div>
        </>
    )
}
export default Landingpage;