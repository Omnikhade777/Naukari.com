import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


const AdminResetpass=()=>{
    const [password,setpassword]=useState<string>("");
    const [loading,setloading]=useState<Boolean>(false);
    const [messages,setmessages]=useState<string>("")
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token: string | null = queryParams.get("token");

   console.log("Token from URL:", token);
    const resetpassword=async()=>{
        setloading(true);
     try{
         const response=await axios.post("http://localhost:3000/api/v1/adminauth/forgetpassword/reset-password",{
           newPassword:password,
           token
         });
         const { message }=response.data;
         setmessages(message)
         setpassword("");
         setloading(false);
     }catch(err){
        const error=err as AxiosError<{message:string}>;
        setmessages(error.response?.data?.message || "something went wrong")
        setloading(false);
     }
    };

  useEffect(()=>{
   if(messages){
    const timer=setTimeout(()=>{
      setmessages("")
    },2000);

    return ()=> clearTimeout(timer)
   }
  },[messages]);

    return(
        <>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
    <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Reset password</h2>
    <div className="mb-4">
      <input
        onChange={(e)=>{
            setpassword(e.target.value);
        }}
        type="password"
        placeholder="password"
        value={password}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
    <button
     onClick={resetpassword}
      className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200"
    >
      { loading ? "updating..." :"password Reset"}
    </button>
      {messages && <div className="mt-4 text-center text-red-500">{messages}</div>}
  </div>
</div>
        </>
    )
}
export default AdminResetpass;