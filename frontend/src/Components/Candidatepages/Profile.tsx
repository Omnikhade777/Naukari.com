import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile=()=>{
    const [profile,setprofile]=useState<any>({});
    const token=localStorage.getItem("token");
    const navigate=useNavigate();

    useEffect(()=>{
        const fetchdata=async()=>{
          const response=await axios.get("http://localhost:3000/api/v1/candidatehandler/myprofile",{
            headers:{
                Authorization:token
            }
          });
          setprofile(response.data.parsedProfile)
        }
        fetchdata();
    },[])

    return(
       <>
  <div className="max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
    <div className="flex justify-center mt-4">
      <img
        src="https://img.icons8.com/ios-filled/100/user-male-circle.png"
        alt="Profile"
        className="w-24 h-24 rounded-full object-cover"/>
    </div>
    <div className="p-4 text-center">
      <p className="text-gray-600">{profile?.description ? profile?.description : "no description"}</p>
      <button
      onClick={()=>{navigate("/update/profile");}}
       className="bg-blue-700 text-white px-6 py-2 rounded-full mt-5 p-5 text-sm">Edit</button>
    </div>
    <div className="px-4 pb-4">
      <h3 className="text-lg font-semibold text-blue-600 mb-2">Skills</h3>
      <ul className="flex flex-wrap gap-2">
        {profile?.skills && profile?.skills?.length > 0 ? profile?.skills?.map((skill: any, index: number) => (
          <li
            key={index}
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
          >
            {skill}
          </li>
        )) : "skills are not define"}
      </ul>
    </div>
    <div className="px-4 pb-4">
      <h3 className="text-lg font-semibold text-green-600 mb-2">Location</h3>
      <p className="text-gray-700">{profile?.location || "remote"}</p>
    </div>
    <div className="px-4 pb-4">
      <h3 className="text-lg font-semibold text-purple-600 mb-2">Experience</h3>
      { profile?.exprerience && profile?.exprerience?.length >0 ? profile?.exprerience?.map((exp: any, index: number) => (
        <div key={index}
          className="bg-gray-100 p-2 rounded-lg mb-2 text-gray-800">
          <strong>{exp.company}</strong><br></br>{exp.role} ({exp.years} years)
        </div>
      )) : "no Experience"}
    </div>
    <div className="px-4 pb-4">
      <h3 className="text-lg font-semibold text-orange-600 mb-2">Education</h3>
      {profile?.education && profile?.education?.length > 0 ? profile?.education?.map((edu: any, index: number) => (
        <div key={index}
          className="bg-gray-100 p-2 rounded-lg mb-2 text-gray-800">
          <strong>{edu.degree}</strong> from {edu.institute} ({edu.year})
        </div>
      )): "Not given"}
    </div>
  </div>
</>

    )
}

export default Profile;