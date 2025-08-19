import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CSignup=()=>{
     
    const [name,setname]=useState<string>("");
    const [email,setemail]=useState<string>("");
    const [password,setpassword]=useState<string>("");
    const [messages,setmessages]=useState<string>("");
    const navigate=useNavigate();
    
    interface signupresponse{
        id:string,
        message:string
    }

    const postsignup=async()=>{
    try{
      const response = await axios.post<signupresponse>("http://localhost:3000/api/v1/candidateauth/signup",{
          name,
          email,
          password
      });

      const {id , message } = response.data;
      setmessages(message);
      setname("");
      setemail("");
      setpassword("");
    }catch(err){
        console.log(err);
        const error=err as AxiosError<{message:string}>
        setmessages(error.response?.data?.message || "something went wrong")
    }
    };

    useEffect(()=>{
      if(messages){
        setTimeout(() => {
          setmessages("");
        },2000);
      }
    },[messages]);

  useEffect(()=>{
    if(messages ==="candidate is created successfully"){
    const timer=setTimeout(()=>{
      navigate("/user-signin")
     },2000);
     return ()=>clearTimeout(timer);
    }
    },[messages,navigate]);
    
    return(
        <>
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
    <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Sign Up</h2>

    <div className="mb-4">
      <input
        onChange={(e) => setemail(e.target.value)}
        type="email"
        placeholder="Email"
        value={email}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
    <div className="mb-4">
      <input
        onChange={(e) => setname(e.target.value)}
        type="text"
        placeholder="Full Name"
        value={name}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>

    <div className="mb-6">
      <input
        onChange={(e) => setpassword(e.target.value)}
        type="password"
        placeholder="Password"
        value={password}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
    <button
      onClick={postsignup}
      className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200"
    >
      Submit
    </button>
     <button
      onClick={() => navigate("/user-signin")}
      className="w-full px-4 py-2 mt-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200"
    >
      Already have an account? Sign In
    </button>
      {messages && <div className="mt-4 text-center text-red-500">{messages}</div>}
  </div>
</div>
</>
    )
}
export default CSignup;