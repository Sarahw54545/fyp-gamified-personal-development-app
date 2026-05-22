import AuthForm from "@/components/auth/AuthForm";
import Navbar from "../components/landing/Navbar";

function Login() {
  return (
    <div
      className="min-h-screen bg-cover bg-center relative text-white"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      <Navbar />

      <div className="relative z-10 flex items-center justify-center pt-24 px-6">
        <AuthForm mode="login" />
      </div>
    </div>
  );
}

export default Login;