import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

   
    if (formData.email === "test@test.com" && formData.password === "1234") {
      navigate("/dashboard");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b4c5f]">
      <div className="bg-white rounded-2xl shadow-lg flex w-[900px] overflow-hidden">
        
     
        <div className="w-1/2 hidden md:block rounded-xl">
          <img
            src="/ship.jpg"
            alt="Shipping"
            className="object-cover h-full w-full rounded-2xl p-3"
          />
        </div>

        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-2">Sign In</h2>
          <p className="text-sm mb-6">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-600">
              Sign Up
            </a>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border-none rounded-lg bg-gray-100"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border-none rounded-lg bg-gray-100"
              required
            />

            <button
              type="submit"
              className="w-full bg-[#0b4c5f] text-white p-3 rounded-lg hover:bg-[#083946] transition"
            >
              Sign In
            </button>
          </form>

        
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="px-2 text-sm text-gray-500">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

        
          <button className="w-full flex items-center justify-center gap-2 border rounded-lg p-3 hover:bg-gray-100 transition">
            <FaGoogle className="text-red-500" />
            <span>Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}
