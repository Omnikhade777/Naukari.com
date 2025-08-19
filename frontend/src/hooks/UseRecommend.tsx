import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

   interface recomendjobs<T>{
        message:string,
        recomendjobs:T[],
        

    }
const UseRecommend=<T,>()=>{
const [recommendjobs,setrecommendjobs]=useState<T[]>([]);
const [message,setmessage]=useState<string>("");
 
    useEffect(()=>{
     const getrecommendjobs=async()=>{
        try{
        const response=await axios.get<recomendjobs<T>>("http://localhost:3000/api/v1/candidatefeatures/recomendedjobs",{
        headers:{
            Authorization:localStorage.getItem("token"),
        }
      });
      const {message, recomendjobs} = response.data;
      setrecommendjobs(recomendjobs);
      setmessage(message);
    }catch(err){
     const error=err as AxiosError<{message:string}>
     setmessage(error.response?.data?.message || "something went wrong")
    }

     }
     getrecommendjobs();
    },[]);

    return {message,recommendjobs};
}

export default UseRecommend;