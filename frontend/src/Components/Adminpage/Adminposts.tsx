
import { useNavigate } from "react-router-dom";

const Adminposts=({jobs ,onDelete}:any)=>{
  

  
  const navigate=useNavigate();
 
    return (
        <>
         <div className="flex justify-center mt-6">
        <strong className="text-3xl">Your Posted Jobs </strong>
      </div>
      <div className="h-[80vh] overflow-y-auto pr-3 mt-6">
        {jobs.map((a:any) => (
          <div key={a.id}
          onClick={()=>{
            navigate("/joboperation",{state:{jobid:a.id}});
          }}
            className="border border-gray-200 rounded-xl p-6 mb-6 shadow-md bg-white hover:shadow-lg transition-shadow duration-200 ease-in-out cursor-pointer">
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-semibold text-blue-700">{a.title}</h2>
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full ${a.isActive ? "bg-green-100 text-green-700": "bg-red-100 text-red-700"}`}>
                {a.isActive ? "Active" : "Closed"}
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
               className="px-3 py-1 text-xs font-medium rounded bg-red-500 text-white">
               <button onClick={(e) => { e.stopPropagation(); onDelete(a.id)}} >delete</button>
              </span>
            </div>
       
           <button
           onClick={(e)=>{
            e.stopPropagation();
            navigate("/application",{state:{id:a.id}});

           }}
              className="px-3 py-2 mt-5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 
             text-white font-semibold shadow-md hover:shadow-lg 
             hover:scale-105 transition-transform duration-200">
             Application's
            </button>
    </div>
 ))}

 </div>
        
        </>
    )
}
export default Adminposts;