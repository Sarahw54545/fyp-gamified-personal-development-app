import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "@/services/apiClient";
import { useAuth } from "../hooks/use-Auth";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await apiFetch(
        `/api/auth/login`,
        {
          method: "POST",
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      login(data.token, data.user);
      navigate("/dashboard");

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">

      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-8 rounded-lg space-y-4"
      >
        <h1 className="text-xl font-bold">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 rounded bg-slate-800"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 rounded bg-slate-800"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 p-2 rounded"
        >
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;