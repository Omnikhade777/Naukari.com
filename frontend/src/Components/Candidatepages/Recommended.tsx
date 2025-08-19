
import UseRecommend from "../../hooks/UseRecommend";

//incomplete work
const Recommended=()=>{
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

  
    const {recommendjobs}=UseRecommend<jobinfo>();
  
    const deleteapplication=()=>{

    }
    return(
      <>
    <div className="flex justify-center mt-10 px-4">
  <div className="w-full max-w-5xl">
    <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
      💼 Applied Jobs
    </h1>

    <div className="grid gap-6 md:grid-cols-2">
      {re.map((job) => (
        <div
          key={job.id}
          className="border border-gray-200 rounded-xl p-6 shadow-md bg-white hover:shadow-lg transition-shadow duration-200 ease-in-out"
        >
          <h2 className="text-xl font-semibold text-blue-700 mb-3">{job.title}</h2>
          <p className="text-gray-600 mb-4">{job.description}</p>

          <div className="grid grid-cols-1 gap-2 text-sm text-gray-700 sm:grid-cols-2">
            <p>
              <strong>📅 Post Date:</strong>{" "}
              {new Date(job.postedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
            <p>
              <strong>⏳ Deadline:</strong>{" "}
              {new Date(job.deadline).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
            <p>
              <strong>📍 Location:</strong> {job.location || "Not specified"}
            </p>
            <p>
              <strong>💰 Salary:</strong> {job.salary || "Not specified"}
            </p>
            <p>
              <strong>🛠 Skills:</strong> {job.skillsrequired.length ? job.skillsrequired.join(", ") : "None"}
            </p>
            <p>
              <strong>📂 Job Type:</strong> {job.jobtype || "Not specified"}
            </p>
            <p>
              <strong>✅ Active:</strong>{" "}
              <span
                className={job.isActive ? "text-green-600 font-medium" : "text-red-500"}
              >
                {job.isActive ? "Yes" : "No"}
              </span>
            </p>
          </div>

          <div className="mt-4 text-center">
            <button
             onClick={()=>{
                deleteapplication(job.id);
             }}
             className="bg-red-600 hover:bg-red-400 text-white px-5 py-2 rounded-lg shadow-sm transition-colors duration-200">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
</>

    )
}

export default Recommended;