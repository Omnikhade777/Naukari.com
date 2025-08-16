import Usefetchpost from "../../hooks/Usefetchpost";
import Header from "./Header";
import Profile from "./Profile";

const Mainpage=()=>{

    interface jobinfo{
        id:string,
        title:string,
        description:string,
        postedAt:string,
        deadline:string,
        skillsrequired:string[],
        salary:string,
        location:string,
        jobtype:string,
        isActive:Boolean
    }

    const {jobs} = Usefetchpost<jobinfo>();

return (
  <>
  <div className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
    <Header />
  </div>
  <div className="flex gap-6 mt-24 max-w-7xl mx-auto px-4">
  <div className="flex-1">
    <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
      💼 Job Listings
    </h1>

    {jobs.map((job) => (
      <div
        key={job.id}
        className="border border-gray-200 rounded-xl p-6 mb-6 shadow-md bg-white hover:shadow-lg transition-shadow duration-200 ease-in-out"
      >
        <h2 className="text-xl font-semibold text-blue-700 mb-2">{job.title}</h2>
        <p className="text-gray-600 mb-4">{job.description}</p>
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm text-gray-700">
          <p>
            <strong>📅 Post Date:</strong>{" "}
            {new Date(job.postedAt).toLocaleString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
          <p>
            <strong>⏳ Deadline:</strong>{" "}
            {new Date(job.deadline).toLocaleString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
          <p>
            <strong>📍 Location:</strong> {job.location}
          </p>
          <p>
            <strong>💰 Salary:</strong> {job.salary}
          </p>
          <p>
            <strong>🛠 Skills:</strong> {job.skillsrequired.join(", ")}
          </p>
          <p>
            <strong>📂 Job Type:</strong> {job.jobtype}
          </p>
          <p>
            <strong>✅ Active:</strong>{" "}
            <span
              className={
                job.isActive ? "text-green-600 font-medium" : "text-red-500"
              }
            >
              {job.isActive ? "Yes" : "No"}
            </span>
          </p>
        </div>
        <div className="mt-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors duration-200">
            Apply Now
          </button>
        </div>
      </div>
    ))}
  </div>
    <div className="sticky top-24 h-fit w-[400px] bg-white rounded-lg ml-20 p-4">
      <Profile />
    </div>
  </div>
</>

);

}
export default Mainpage;