import axios from "axios";
import { useEffect, useState } from "react";


  interface jobresponse<T>{
      message:string,
      posts:T[];
    }
    const Usefetchpost=<T,>()=>{
    const [jobs,setjobs]=useState<T[]>([]);
    const getjobs=async()=>{
    const response=await axios.get<jobresponse<T>>("http://localhost:3000/api/v1/adminjobhandler/alljobpost");
    setjobs(response?.data?.posts);
 }

    useEffect(()=>{
    getjobs();
     },[])


     return {jobs};

    }
export default Usefetchpost;