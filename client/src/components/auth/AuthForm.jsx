import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "@/services/apiClient";
import { useAuth } from "@/hooks/use-Auth";
import { Eye, EyeOff } from "lucide-react";

function getPasswordStrength(password) {
  if (!password) return { label: "", value: 0 };
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[^a-zA-Z0-9]/.test(password);
  if (password.length < 8) return { label: "Weak", value: 25 };
  if (!hasNumber) return { label: "Medium", value: 50 };
  if (!hasSymbol) return { label: "Strong", value: 75 };
  return { label: "Very strong", value: 100 };
}

function AuthForm({ mode }) {
  const isSignup = mode === "signup";
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isSignup) {
      const savedEmail = localStorage.getItem("signupEmail");
      if (savedEmail) {
        setEmail(savedEmail);
        localStorage.removeItem("signupEmail");
      }
    }
  }, [isSignup]);

  const passwordStrength = useMemo(
    () => getPasswordStrength(password),
    [password]
  );

  const validate = () => {
    const errs = {};

    if (!email) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      errs.email = "Invalid email format";

    if (!password) errs.password = "Password is required";
    else if (isSignup && password.length < 8)
      errs.password = "Password must be at least 8 characters";

    if (isSignup && password !== confirmPassword)
      errs.confirmPassword = "Passwords do not match";

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess(null);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);

      if (isSignup) {
        await apiFetch("/api/auth/register", {
          method: "POST",
          body: JSON.stringify({ email, password }),
        });

        localStorage.setItem("signupEmail", email);

        setSuccess("Account created successfully. Please log in.");

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        const data = await apiFetch("/api/auth/login", {
          method: "POST",
          body: JSON.stringify({ email, password }),
        });

        login(data.token, data.user);
        navigate("/dashboard");
      }
    } catch (err) {
      setErrors({ global: err.message || "Authentication failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-8 rounded-lg space-y-4 w-80"
      >
        <h1 className="text-xl font-bold text-center">
          {isSignup ? "Create Account" : "Log In"}
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 rounded bg-slate-800"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email}</p>
        )}

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-2 pr-10 rounded bg-slate-800"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-xs text-red-500">{errors.password}</p>
        )}

        {isSignup && password && (
          <div className="space-y-1">
            <div className="h-2 w-full rounded bg-slate-700 overflow-hidden">
              <div
                className={`h-2 rounded transition-all duration-300 ${
                  passwordStrength.value < 50
                    ? "bg-red-500"
                    : passwordStrength.value < 75
                    ? "bg-yellow-500"
                    : passwordStrength.value < 100
                    ? "bg-indigo-500"
                    : "bg-emerald-500"
                }`}
                style={{ width: `${passwordStrength.value}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Password strength:{" "}
              <span className="font-medium">
                {passwordStrength.label}
              </span>
            </p>
            <p className="text-[11px] text-slate-500">
              Use at least 8 characters, a number, and a symbol
            </p>
          </div>
        )}

        {isSignup && (
          <>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full p-2 rounded bg-slate-800"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500">
                {errors.confirmPassword}
              </p>
            )}
          </>
        )}

        {errors.global && (
          <p className="text-sm text-red-500 text-center">
            {errors.global}
          </p>
        )}

        {success && (
          <p className="text-sm text-emerald-400 text-center">
            {success}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-indigo-600 p-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading
            ? isSignup
              ? "Creating account..."
              : "Logging in..."
            : isSignup
            ? "Sign Up"
            : "Log In"}
        </button>

        <p className="text-sm text-center text-slate-400">
          {isSignup ? (
            <>
              Already have an account?{" "}
              <span
                className="text-indigo-400 hover:underline cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Log In
              </span>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <span
                className="text-indigo-400 hover:underline cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
}

export default AuthForm;