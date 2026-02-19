// src/pages/Auth/LoginPage.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../../components/context/AuthContext";
import { login } from "../../services/services";
import "./AuthPage.css";

const schema = z.object({
  email:    z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type FormData = z.infer<typeof schema>;

const LoginPage = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setApiError("");
    try {
      const res = await login(data.email, data.password);
      const { accessToken, refreshToken, user } = res.data;
      authLogin(accessToken, refreshToken || "", user);
      navigate("/dashboard");
    } catch (err: any) {
      setApiError(err?.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Left Panel */}
      <div className="auth-panel-left">
        <div className="auth-panel-wave">
          <svg width="100%" height="100%" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 400C100 300 200 500 300 400C400 300 500 500 600 400C700 300 800 500 800 400V800H0V400Z" fill="url(#paint0_linear)" />
            <defs>
              <linearGradient id="paint0_linear" x1="400" y1="300" x2="400" y2="800" gradientUnits="userSpaceOnUse">
                <stop stopColor="#C8962A" stopOpacity="0.2" />
                <stop offset="1" stopColor="#C8962A" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="auth-quote-container">
          <h2 className="auth-pull-quote">
            "Your brand has<br />
            a voice. Let it<br />
            <span className="italic">speak.</span>"
          </h2>
          <div className="auth-testimonials">
            <div className="testimonial-tag">
              <span className="testimonial-dot"></span>
              <span>ACME CORP</span>
            </div>
            <div className="testimonial-tag">
              <span className="testimonial-dot"></span>
              <span>INDIE TECH</span>
            </div>
            <div className="testimonial-tag">
              <span className="testimonial-dot"></span>
              <span>GLOBAL FLOW</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="auth-panel-right">
        <Link to="/" className="auth-logo-link">VOICE AGENT</Link>
        
        <div className="auth-form-container">
          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">Sign in to your account</p>

          {apiError && <div className="auth-form-error-banner">{apiError}</div>}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label className="label">Email address</label>
              <input
                className="input"
                type="email"
                placeholder="you@example.com"
                {...register("email")}
              />
              {errors.email && <span className="form-field-error">{errors.email.message}</span>}
            </div>

            <div className="form-group">
              <label className="label">Password</label>
              <input
                className="input"
                type="password"
                placeholder="••••••••"
                {...register("password")}
              />
              {errors.password && <span className="form-field-error">{errors.password.message}</span>}
            </div>

            <button
              className="btn-primary auth-submit-btn"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <p className="auth-switch-link">
            Don't have an account? <Link to="/register">Create one free</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
