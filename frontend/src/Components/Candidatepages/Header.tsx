import { useNavigate } from "react-router-dom";



const Header=({trigger}:any)=>{
  const navigate=useNavigate();

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
          <button 
  onClick={trigger}
  className="bg-gray-200 px-4 py-2 rounded">
  All jobs
</button>
        </div>
      </div>
    </header>
        
        </>
    )
}
export default Header;