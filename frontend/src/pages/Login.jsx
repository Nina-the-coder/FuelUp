// Login.jsx
import React, { useState } from "react";
import axios from "axios";
import googleicon from "../assets/googleicon.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  // form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ui state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // basic client validation
  const validate = () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return false;
    }
    // simple email regex
    const re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError("");
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      // expected: { token, user }
      const { token, user } = res.data || {};
      if (!token) throw new Error("Missing token in response");
      localStorage.setItem("token", token);
      if (user) localStorage.setItem("user", JSON.stringify(user));
      // optionally set default axios header
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      navigate("/");
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || err.message || "Login failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => {
    // redirect to your backend google OAuth entrypoint
    window.location.href = "/api/auth/google";
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-1 text-center">Fuel Up</h2>
        <p className="text-sm text-gray-600 text-center mb-6">Welcome back — login to continue</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-sm text-red-600 bg-red-50 border border-red-100 p-3 rounded">{error}</div>}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@domain.com"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200"
              disabled={loading}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200"
              disabled={loading}
              required
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <div>
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="text-blue-600 hover:underline"
              >
                Sign up
              </button>
            </div>
            {/* optional forgot password link */}
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-gray-500 hover:underline"
            >
              Forgot?
            </button>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className={`w-full py-2 rounded-xl text-white ${loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"}`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="flex items-center text-sm text-gray-400">
            <div className="flex-1 border-t" />
            <div className="px-3">or continue with</div>
            <div className="flex-1 border-t" />
          </div>

          <button
            type="button"
            onClick={handleGoogle}
            className="w-full py-2 rounded-xl border flex items-center justify-between px-3 hover:bg-gray-50"
          >
            <img src={googleicon} alt="Google" className="w-6 h-4" />
            <span>Continue with Google</span>
            <span className="w-6" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
