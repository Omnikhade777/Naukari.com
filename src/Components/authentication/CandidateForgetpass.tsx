import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../../Config";

const CandidateForgetpass=()=>{
   const [email,setemail]=useState<string>("");
    const [loading,setloading]=useState<Boolean>(false);
    const sendmail=async()=>{
        setloading(true);
     try{
        await axios.post(`${BACKEND_URL}/api/v1/candidateauth/forgotcandidatepassword/forget-password`,{
        email
      });
      setemail("");
     }catch(err){
        console.log(err);
     }
       setloading(false);
    }
    return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
    <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Reset password</h2>
    <div className="mb-4">
      <input
       onChange={(e)=>{
        setemail(e.target.value);
       }}
        type="email"
        placeholder="Email"
        value={email}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
    <button
      onClick={sendmail}
      className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200"
    >
      { loading ? "sending..." :"Send Email"}
    </button>
  </div>
</div>
    )
}
export default CandidateForgetpass;
