import { useNavigate } from "react-router-dom";

const NotFoundroute=()=>{
    const navigate=useNavigate();
    return(
        <>
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white">
      <h1 className="text-9xl font-extrabold animate-bounce drop-shadow-lg">404</h1>
      <h2 className="text-3xl md:text-4xl font-bold mt-4">Oops! Page Not Found</h2>
      <p className="mt-3 text-lg text-gray-200 max-w-md text-center">
        The page you’re looking for doesn’t exist or has been moved.  
        Let’s get you back on track!
      </p>

      <button
        onClick={() => navigate("/")}
        className="mt-8 px-6 py-3 rounded-2xl bg-white text-indigo-600 font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all"
      >
        Go Home
      </button>
    </div>
        </>
    )
}
export default NotFoundroute;