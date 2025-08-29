import { useLocation, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

const Jobchanges = () => {
  const locations = useLocation();
  const id = locations.state.jobid;
  const navigate = useNavigate();

  const [updatejob, setupdatejob] = useState<any>({
    title: "",
    description: "",
    postedAt: "",
    deadline: "",
    salary: "",
    location: "",
    jobtype: "",
  });
  const [skills, setskills] = useState("");
  const [message, setmessage] = useState<string>("");
  const [loading, setloading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/adminjobhandler/job/${id}`
        );
         const  parsed = response?.data?.job[0];

        setupdatejob({
          title: parsed?.title || "",
          description: parsed?.description || "",
          location: parsed?.location || "",
          postedAt: parsed?.postedAt?.split("T")[0] || "",
          deadline: parsed?.deadline?.split("T")[0] || "",
          salary: parsed?.salary || "",
          jobtype: parsed?.jobtype || "",
        });
        setskills((parsed?.skillsrequired || []).join(", "));
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, [id]);

  const updatejobs = async () => {
    try {
      setloading(true);
      const response = await axios.put(
        `http://localhost:3000/api/v1/adminjobhandler/updatejob/${id}`,
        {
          title: updatejob.title,
          description: updatejob.description,
          postedAt: updatejob.postedAt,
          deadline: updatejob.deadline,
          skillsrequired: skills.split(",").map((a) => a.trim()),
          isActive: true,
          salary: updatejob.salary,
          location: updatejob.location,
          jobtype: updatejob.jobtype,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      const { message } = response.data;
      setmessage(message);
      setloading(false);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setmessage(error.response?.data?.message || "something went wrong");
      setloading(false);
    }
  };

  const handlestateaftersubmit=()=>{
      if(message==="post is updated successfully !"){
      navigate("/aboutadmin");
    }
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setmessage("");
      handlestateaftersubmit();
      
    }, 2000);

    return () => clearTimeout(timer);
  }, [message]);

  return (
    <>
      <div className="max-w-2xl mx-auto mt-7 bg-white rounded-2xl shadow-md p-6 mb-6 border border-gray-200">
        <button
          className="px-3 py-2 mb-4  bg-gray-400 text-white rounded-full shadow-sm hover:bg-gray-500 transition font-medium"
          onClick={() => {
            navigate("/aboutadmin");
          }}
        >
          back
        </button>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Update a Job
        </h2>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Title
            </label>
            <input
              value={updatejob.title}
              onChange={(e) =>
                setupdatejob({ ...updatejob, title: e.target.value })
              }
              type="text"
              placeholder="e.g. UI/UX Designer"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={updatejob.description}
              onChange={(e) =>
                setupdatejob({ ...updatejob, description: e.target.value })
              }
              placeholder="Write a short description of the role..."
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Posted Date
              </label>
              <input
                value={updatejob.postedAt}
                onChange={(e) =>
                  setupdatejob({ ...updatejob, postedAt: e.target.value })
                }
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deadline
              </label>
              <input
                value={updatejob.deadline}
                onChange={(e) =>
                  setupdatejob({ ...updatejob, deadline: e.target.value })
                }
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skills Required
            </label>
            <input
              value={skills}
              onChange={(e) => setskills(e.target.value)}
              type="text"
              placeholder="e.g. Figma, Wireframing, Prototyping"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              Separate skills with commas
            </p>
          </div>
          <div className="grid grid-cols-1 mt-3 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                value={updatejob.location}
                onChange={(e) =>
                  setupdatejob({ ...updatejob, location: e.target.value })
                }
                type="text"
                placeholder="e.g. Remote"
                className="w-full mt-3 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Type
              </label>
              <select
                value={updatejob.jobtype}
                onChange={(e) =>
                  setupdatejob({ ...updatejob, jobtype: e.target.value })
                }
                className="w-full mt-3 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Internship</option>
                <option>Contract</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Salary
              </label>
              <input
                value={updatejob.salary}
                onChange={(e) =>
                  setupdatejob({ ...updatejob, salary: e.target.value })
                }
                type="text"
                placeholder="e.g. 8 LPA"
                className="w-full px-4 mt-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="pt-4">
            <button
              onClick={updatejobs}
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition">
              {loading ? "updating...." : "Update Job"}
            </button>
          </div>
          <div className=" flex justify-center">
            <div
              className={
                message === "post is updated successfully !"
                  ? "mt-3 text-green-500 font-medium"
                  : "mt-3 text-red-500 font-medium"}>
              {message}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Jobchanges;
