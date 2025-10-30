import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../Config";


  interface jobresponse<T>{
      message:string,
      posts:T[];
    }
    const Usefetchpost=<T,>()=>{
    const [jobs,setjobs]=useState<T[]>([]);

    
    const getjobs=async()=>{
    const response=await axios.get<jobresponse<T>>(`${BACKEND_URL}/api/v1/adminjobhandler/alljobpost`);
    setjobs(response?.data?.posts);
 }

    useEffect(()=>{
    getjobs();
     },[])


     return {jobs,setjobs};

    }
export default Usefetchpost;