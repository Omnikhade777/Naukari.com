import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin=()=>{
    const [email,setemail]=useState<string>("");
    const [password,setpassword]=useState<string>("");
    const [loading,setloading]=useState<Boolean>(false);
    const [messages,setmessages]=useState<string>("");
    const navigate=useNavigate();

    interface signinresponse{
        token:string,
        id:string,
        message:string
    }

    const postsignin=async()=>{
      setloading(true);
      try{
        const response=await axios.post<signinresponse>("http://localhost:3000/api/v1/adminauth/signin",{
            email,
            password
        });
        const {token,message, id}=response.data;
        localStorage.setItem("token",token);
        setemail("");
        setpassword("");
        setmessages(message);
        navigate("/landingpage")
      }catch(err){
        console.log(err);
        const error=err as AxiosError<{message:string}>
        setmessages(error.response?.data?.message || "Something went wrong");
        setloading(false)
        console.log(messages)
      }
      
    };

    useEffect(()=>{
      if(messages){
     const timer=setTimeout(() => {
        setmessages("")
      }, 3000);
    return ()=>clearTimeout(timer);
  }},[messages])

    return(
        <>
<div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
    <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Sign in</h2>

    <div className="mb-4">
      <input
        onChange={(e) => setemail(e.target.value)}
        type="email"
        placeholder="Email"
        value={email}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
    </div>
    <div className="mb-1">
      <input
        onChange={(e) => setpassword(e.target.value)}
        type="password"
        placeholder="Password"
        value={password}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
    </div>
    <div className="mb-6 text-right">
      <button
        onClick={() => navigate("/adminfoget")}
        className="text-sm text-blue-600 hover:underline focus:outline-none">
        Forgot password?
      </button>
    </div>
    <button
      onClick={postsignin}
      className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200">
    {loading ? "processing..." : "Sign in"}
    </button>
    <button
      onClick={() => navigate("/signup")}
      className="w-full px-4 py-2 mt-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200"
    > Don't have an account</button>
    {messages && <div className="mt-4 text-center text-red-500">{messages}</div>}
  </div>
</div>

 </>
    )
}

export default Signin;