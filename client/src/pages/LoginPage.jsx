import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = {};

    if (!form.email.trim()) {
      nextErrors.email = "Email is required";
    }
    if (!form.password.trim()) {
      nextErrors.password = "Password is required";
    }

    if (Object.keys(nextErrors).length) {
      setError(nextErrors);
      return;
    }

    setError({});

    try {
      await login(form);
      navigate("/");
    } catch (err) {
      setError({ form: err.response?.data?.message || "Unable to sign in" });
    }
  };

  return (
    <AuthLayout title="Sign in" subtitle="Access your dashboard and keep every transaction in sync.">
      <form className="space-y-5" onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          placeholder="name@example.com"
          value={form.email}
          onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
          error={error.email}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
          error={error.password}
        />
        {error.form ? <p className="text-sm text-rose-500">{error.form}</p> : null}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
      <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
        No account yet?{" "}
        <Link className="font-semibold text-brand-600 dark:text-brand-300" to="/register">
          Create one
        </Link>
      </p>
    </AuthLayout>
  );
};

export default LoginPage;
