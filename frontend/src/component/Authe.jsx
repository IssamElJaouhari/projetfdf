import axios from "axios";
import { useState } from "react";

const Authe = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChanges = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const apiUrl = isLogin
        ? "http://localhost:7007/api/auth/login"
        : "http://localhost:7007/api/auth/register";

      const res = await axios.post(apiUrl, form);

      if (isLogin) {
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        fetchProfile(res.data.token);
      } else {
        alert("✅ User registered! You can now login.");
        setIsLogin(true);
        setForm({ name: "", email: "", password: "" }); // Clear form after successful registration
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      setError(errorMessage);
      console.error(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchProfile = async (jwtToken = token) => {
    try {
      const res = await axios.get("http://localhost:7007/api/auth/profile", {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });
      setUser(res.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">
          {isLogin ? "Login" : "Register"}
        </h2>
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
            ❌ {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChanges}
              className="w-full p-2 border rounded-md"
              required
              disabled={loading}
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChanges}
            className="w-full p-2 border rounded-md"
            required
            disabled={loading}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChanges}
            className="w-full p-2 border rounded-md"
            required
            disabled={loading}
          />
          <input
            type="email"
            name="email"
            id="eamil"
            value={"issam@gmail.com"}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="text-center mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>

        {user && (
          <div className="mt-6 p-4 border rounded-md bg-gray-50">
            <h3 className="font-semibold mb-2">👤 Profile</h3>
            <pre className="text-sm">{JSON.stringify(user, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Authe;
