import { AlertTriangle } from "lucide-react"; // nice error icon
import { useNavigate } from "react-router-dom";

const Problem = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-50">
      <div className="bg-red-100 p-6 rounded-full mb-6">
        <AlertTriangle className="w-16 h-16 text-red-600" />
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Oops! Something went wrong
      </h1>
      <p className="text-gray-600 text-center mb-6 max-w-md">
        We couldn’t find the page you were looking for. It might have been moved
        or deleted. Please check the URL or return to the homepage.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition">
        Go Back Home
      </button>
    </div>
  );
};

export default Problem;
