import { useNavigate } from "react-router-dom";
import { Briefcase, User, Shield } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col">
      <header className="flex justify-between items-center px-10 py-6 bg-white shadow-md">
        <div className="text-2xl font-bold text-blue-700 cursor-pointer">Naukari.com</div>
        <div className="flex gap-6">
          <button
            onClick={() => navigate("/user-signin")}
            className="px-4 py-2 text-blue-700 font-semibold hover:underline">
            Sign In
          </button>
          <button
            onClick={() => navigate("/user-signup")}
            className="px-4 py-2 bg-blue-700 text-white rounded-lg shadow hover:bg-blue-800 transition">
            Sign Up
          </button>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-between px-16">
        <div className="max-w-xl">
          <h1 className="text-5xl font-extrabold text-gray-900 leading-snug">
            Connect, Apply & Grow Your <span className="text-blue-700">Career</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            Find the right jobs, build your professional network, and unlock opportunities. 
            Whether you are a <span className="font-semibold">Candidate</span> or an 
            <span className="font-semibold"> Admin</span>, we’ve got you covered.
          </p>

          <div className="mt-8 flex gap-6">
            <button
              onClick={() => navigate("/user-signup")}
              className="flex items-center gap-2 px-6 py-3 bg-blue-700 text-white rounded-lg shadow hover:bg-blue-800 transition"
            >
              <User size={20} /> Candidate Sign Up
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="flex items-center gap-2 px-6 py-3 border border-blue-700 text-blue-700 rounded-lg hover:bg-blue-50 transition"
            >
              <Shield size={20} /> Admin Sign Up
            </button>
          </div>
        </div>

    <div className="hidden md:block">
  <img
    src="https://static.vecteezy.com/system/resources/previews/014/248/484/large_2x/people-networking-for-business-opportunity-connect-with-team-or-friends-social-media-or-business-connection-for-success-concept-flat-modern-illustration-vector.jpg"
    alt="Networking Illustration"
    className="w-[520px] max-w-full"
  />
</div>

      </main>
      <section className="bg-white py-16 px-12 grid md:grid-cols-3 gap-10 text-center shadow-inner">
        <div className="p-6 bg-blue-50 rounded-2xl shadow-sm hover:shadow-md transition">
          <Briefcase className="mx-auto text-blue-700 mb-4" size={40} />
          <h3 className="text-xl font-semibold text-gray-900">Find Jobs</h3>
          <p className="mt-2 text-gray-600">Explore thousands of opportunities tailored to your skills.</p>
        </div>
        <div className="p-6 bg-blue-50 rounded-2xl shadow-sm hover:shadow-md transition">
          <User className="mx-auto text-blue-700 mb-4" size={40} />
          <h3 className="text-xl font-semibold text-gray-900">Grow Network</h3>
          <p className="mt-2 text-gray-600">Connect with recruiters and professionals across industries.</p>
        </div>
        <div className="p-6 bg-blue-50 rounded-2xl shadow-sm hover:shadow-md transition">
          <Shield className="mx-auto text-blue-700 mb-4" size={40} />
          <h3 className="text-xl font-semibold text-gray-900">Admin Tools</h3>
          <p className="mt-2 text-gray-600">Manage job postings, track applicants, and streamline hiring.</p>
        </div>
      </section>
      <footer className="bg-blue-900 text-white py-6 text-center text-sm">
        © {new Date().getFullYear()} JobLink. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
