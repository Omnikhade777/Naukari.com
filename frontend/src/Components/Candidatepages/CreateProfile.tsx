import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateProfile=()=>{
 const navigate=useNavigate();
  const [profile, setProfile] = useState<any>({
    description: "",
    skills: [],
    location: "",
    exprerience: [],
    education: [],
  });

  const [skillsInput, setSkillsInput] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/candidatehandler/myprofile",
          { 
            headers:{ 
              Authorization: localStorage.getItem("token") 

            } }
        );
        const parsed = response.data.parsedProfile;
        setProfile({
          description: parsed?.description || "",
          skills: parsed?.skills || [],
          location: parsed?.location || "",
          exprerience: parsed?.exprerience || [],
          education: parsed?.education || [],
        });
        setSkillsInput((parsed?.skills || []).join(", "));
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleUpdateFields = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/v1/candidatehandler/addinfotoprofile",
        {
          profielphoto:"https://img.icons8.com/ios-filled/100/user-male-circle.png",
          description: profile.description,
          location: profile.location,
          skills: skillsInput.split(",").map((s) => s.trim()),
          exprerience: profile.exprerience,
          education: profile.education,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error updating profile!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
       <div><button className="bg-gray-200 px-4 py-2 mr-8 rounded" onClick={()=>{navigate("/mainpage")}}> skip </button></div>
      <h2 className="text-2xl font-bold mb-6 text-center">Create Profile</h2>
       <div className="flex flex-col items-center mb-6"> 
        <label className="relative w-32 h-32">
        <img src={profile.profielphoto || "https://img.icons8.com/ios-filled/100/user-male-circle.png"} 
       alt="Profile" className="w-32 h-32 rounded-full object-cover border-2 border-gray-300" /> 
      </label>  </div>
      <form className="space-y-4" onSubmit={handleUpdateFields}>
        <textarea
          name="description"
          value={profile.description}
          onChange={handleChange}
          placeholder="About you"
          className="w-full border rounded-lg p-2"/>
        <input
          type="text"
          name="location"
          value={profile.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border rounded-lg p-2"/>
        <input
          type="text"
          name="skills"
          value={skillsInput}
          onChange={(e) => setSkillsInput(e.target.value)}
          placeholder="Skills (comma separated)"
          className="w-full border rounded-lg p-2"
        />
        <div>
          <h3 className="text-lg font-semibold mb-2">Education</h3>
          {(profile.education || []).map((edu: any, index: number) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => {
                  const newEdu = [...profile.education];
                  newEdu[index].degree = e.target.value;
                  setProfile({ ...profile, education: newEdu });
                }}
                className="border p-2 rounded w-1/3"
              />
              <input
                type="text"
                placeholder="Institute"
                value={edu.institute}
                onChange={(e) => {
                  const newEdu = [...profile.education];
                  newEdu[index].institute = e.target.value;
                  setProfile({ ...profile, education: newEdu });
                }}
                className="border p-2 rounded w-1/3"
              />
              <input
                type="number"
                placeholder="Year"
                value={edu.year}
                onChange={(e) => {
                  const newEdu = [...profile.education];
                  newEdu[index].year = e.target.value;
                  setProfile({ ...profile, education: newEdu });
                }}
                className="border p-2 rounded w-1/3"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setProfile({
                ...profile,
                education: [...profile.education, { degree: "", institute: "", year: "" }],
              })
            }
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            + Add Education
          </button>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Experience</h3>
          {(profile.exprerience || []).map((exp: any, index: number) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Company"
                value={exp.company}
                onChange={(e) => {
                  const newExp = [...profile.exprerience];
                  newExp[index].company = e.target.value;
                  setProfile({ ...profile, exprerience: newExp });
                }}
                className="border p-2 rounded w-1/3"
              />
              <input
                type="text"
                placeholder="Role"
                value={exp.role}
                onChange={(e) => {
                  const newExp = [...profile.exprerience];
                  newExp[index].role = e.target.value;
                  setProfile({ ...profile, exprerience: newExp });
                }}
                className="border p-2 rounded w-1/3"
              />
              <input
                type="number"
                placeholder="Years"
                value={exp.years}
                onChange={(e) => {
                  const newExp = [...profile.exprerience];
                  newExp[index].years = e.target.value;
                  setProfile({ ...profile, exprerience: newExp });
                }}
                className="border p-2 rounded w-1/3"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setProfile({
                ...profile,
                exprerience: [...profile.exprerience, { company: "", role: "", years: "" }],
              })
            }
            className="bg-blue-500 text-white px-3 py-1 rounded">
            + Add Experience
          </button>
        </div>

        <button
          type="submit"
          onClick={()=>{navigate("/mainpage")}}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Add Info
        </button>
      </form>
    </div>
  );
}

export default CreateProfile