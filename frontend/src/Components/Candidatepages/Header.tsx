import { User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";



const Header=({trigger,handelabout}:any)=>{
  const navigate=useNavigate();
  const location=useLocation();

    return(
        <>
          <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
       
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-blue-600">Naukari.com</span>
        </div>
              
        <div className="flex items-center gap-14">
        <button
          onClick={() =>{localStorage.removeItem("token");
             navigate("/user-signin") }}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition">
          Logout
        </button>
        {location.pathname !=="/landingpage" && <button 
       onClick={trigger}
       className="bg-gray-200 px-4 py-2 rounded">
       All jobs
       </button>}
       {location.pathname==="/landingpage" &&
       <button
        onClick={handelabout}
        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition">
       <User className="w-6 h-6 text-gray-600" />
       </button>}
        </div>
      </div>
    </header>
        
        </>
    )
}
export default Header;