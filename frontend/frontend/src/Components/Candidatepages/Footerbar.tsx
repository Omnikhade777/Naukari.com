import { useNavigate } from "react-router-dom";

const Footerbar=()=>{
    const navigate=useNavigate();
    return(
     <>
<header className="z-50 bg-blue-100 backdrop-blur-md shadow-md">
  <div className="max-w-7xl mx-auto px-8 py-3 flex items-center justify-between">
    <span
      onClick={() => navigate("/allapplications")}
      className="text-gray-700 font-medium hover:text-blue-600 transition cursor-pointer"
    >
      My Applications
    </span>

    <span
      onClick={() => navigate("/savedjobs")}
      className="text-gray-700 font-medium hover:text-blue-600 transition cursor-pointer"
    >
      Saved Jobs
    </span>

    <span
      onClick={() => navigate("/recommendjobs")}
      className="text-gray-700 font-medium hover:text-blue-600 transition cursor-pointer"
    >
      Recommended Jobs
    </span>
  </div>
</header>


</>

    )
}
export default Footerbar;