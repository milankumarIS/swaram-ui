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
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type FormData = z.infer<typeof schema>;

const LoginPage = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
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
      setApiError(
        err?.response?.data?.error || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/" className="auth-logo">
          <span className="auth-logo-icon">🎙️</span>
          VoiceAgent
        </Link>

        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-subtitle">Sign in to your account to continue</p>

        {apiError && <div className="auth-error-banner">{apiError}</div>}

        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label className="form-label">Email address</label>
            <input
              id="login-email"
              className="form-input"
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              autoComplete="email"
            />
            {errors.email && (
              <span className="form-error">{errors.email.message}</span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              id="login-password"
              className="form-input"
              type="password"
              placeholder="Your password"
              {...register("password")}
              autoComplete="current-password"
            />
            {errors.password && (
              <span className="form-error">{errors.password.message}</span>
            )}
          </div>

          <button
            id="login-submit"
            className="auth-submit-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing in…" : "Sign In →"}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/register">Create one free</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
