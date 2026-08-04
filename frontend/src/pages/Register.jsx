import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";
import { BarChart3 } from "lucide-react";

function Register() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "researcher",
    organization: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await registerUser(form);
      navigate("/login");
    } catch (err) {
      setError("Registration failed — email may already be in use");
    }
  };

  const inputClass =
    "w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500";

  return (
    <div className="min-h-screen grid grid-cols-2 bg-white">
      <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 p-12">
        <div className="text-white text-center max-w-sm">
          <BarChart3 size={48} className="mx-auto mb-6 opacity-90" />
          <h2 className="text-2xl font-semibold mb-2">Join InnovaFund AI</h2>
          <p className="text-blue-100 text-sm">Start discovering funding and research intelligence today.</p>
        </div>
      </div>

      <div className="flex items-center justify-center px-8 py-10">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <BarChart3 size={18} className="text-white" />
            </div>
            <span className="font-semibold text-lg">InnovaFund AI</span>
          </div>
          <h2 className="text-2xl font-bold mb-1">Create account</h2>
          <p className="text-sm text-gray-500 mb-6">Set up your research profile.</p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-700">Full name</label>
              <input name="full_name" onChange={handleChange} className={`${inputClass} mt-1`} required />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input name="email" type="email" onChange={handleChange} className={`${inputClass} mt-1`} required />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <input name="password" type="password" onChange={handleChange} className={`${inputClass} mt-1`} required />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Role</label>
              <select name="role" onChange={handleChange} className={`${inputClass} mt-1`}>
                <option value="researcher">Researcher</option>
                <option value="startup_founder">Startup Founder</option>
                <option value="innovation_manager">Innovation Manager</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Organization</label>
              <input name="organization" onChange={handleChange} className={`${inputClass} mt-1`} />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium mt-2">
              Create account
            </button>
          </form>

          <p className="text-sm text-gray-500 text-center mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;