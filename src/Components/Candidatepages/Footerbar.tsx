import { useNavigate } from "react-router-dom";

const Footerbar=()=>{
    const navigate=useNavigate();
    return(
        <>
               <header className="z-50  bg-blue-100 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between">
       
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-blue-600">Naukarr.com</span>
        </div>
        <div className="flex items-center gap-14">
        <span
        onClick={() => {
         navigate("/allapplications")
        }}
          className=" text-gray-700 rounded-md transition cursor-pointer"
        >
          MyApplication's
        </span>
          <span
        onClick={() => {
         navigate("/savedjobs")
        }}
          className=" text-gray-700 rounded-md transition cursor-pointer"
        >
        Saved
        </span>
           <span
        onClick={() => {
         navigate("/recommendjobs")
        }}
          className=" text-gray-700 rounded-md transition cursor-pointer"
        >
        Recommend
        </span>
        <button
          onClick={() => console.log("Logout clicked")}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
        >
          Logout
        </button>
        </div>
      </div>
    </header>
        </>
    )
}
export default Footerbar;