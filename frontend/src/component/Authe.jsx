import axios from "axios";
import { useState } from "react";
const Authe = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const handleChagnes = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const hndleSubmit = async (e) => {
    //...
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
        alert("user not registred logged in !");
        setIsLogin(true);
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const fetchProfile = async((jwtToken = token) => {
    try {
      const res = axios.get("http://localhost:7007/api/auth/profile", {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });
      setUser(res.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  });

  return <div></div>;
};

export default Authe;
