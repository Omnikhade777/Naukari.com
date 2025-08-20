import axios from "axios";
import { useEffect, useState } from "react";
//incomplete work
import { useLocation, useSearchParams } from "react-router-dom";

const Similarjobs=()=>{

    interface similarjobs{
        message:string,
        findsimilarjobs:[]
    }
 const location=useLocation();
 const id=location.state.id;
 const[messages,setmessages]=useState<string>("");
 const[similarjobs,setsimilarjobs]=useState<[]>([]);


   useEffect(()=>{
   const getsimilarjobs=async()=>{
    const response=await axios.get<similarjobs>(`http://localhost:3000/api/v1/candidatefeatures/similarjobs/${id}`,{
        headers:{
            Authorization:localStorage.getItem("token"),
        }
    });
    console.log(response.data);
    const {message,findsimilarjobs}=response.data;
    setsimilarjobs(findsimilarjobs);
    

   }
    getsimilarjobs();
   },[])
    
    return(
        <>
     <div className="flex justify-center mt-12 px-6">
  <div className="w-full max-w-4xl">
    <div
      className="border border-gray-200 rounded-2xl p-8 shadow-md bg-gradient-to-r from-blue-50 via-white to-blue-50 hover:shadow-xl hover:scale-[1.01] transition-all duration-300 ease-in-out"
    >
      <h2 className="text-2xl font-semibold text-blue-700 mb-3">hellow</h2>
      <p className="text-gray-600 mb-6 leading-relaxed">my name is john</p>
      {/* {findsimilarjobs.title} */}
        {similarjobs.map((a)=>(
            <div key={a.id}>{a.title}</div>
        ))}
      <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm text-gray-700">
        <p>
          <strong>📅 Post Date:</strong> 12
        </p>
        <p>
          <strong>⏳ Deadline:</strong> 13
        </p>
        <p>
          <strong>📍 Location:</strong> pune
        </p>
        <p>
          <strong>💰 Salary:</strong> 123345
        </p>
        <p>
          <strong>🛠 Skills:</strong> java
        </p>
        <p>
          <strong>📂 Job Type:</strong> remote
        </p>
        <p>
          <strong>✅ Active:</strong>{" "}
          <span className="text-green-600 font-semibold">Yes</span>
        </p>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition duration-200">
            Apply Now
          </button>
        </div>
        <div>
          <button className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-5 py-2 rounded-xl border border-blue-300 shadow-sm hover:shadow-md transition-all duration-200">
            save
          </button>
          <div className="mt-3 text-red-500 font-medium"></div>
        </div>
      </div>
    </div>
  </div>
</div>

        </>
    )
}
export default Similarjobs;