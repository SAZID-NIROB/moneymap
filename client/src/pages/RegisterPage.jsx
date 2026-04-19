import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Name is required";
    }
    if (!form.email.trim()) {
      nextErrors.email = "Email is required";
    }
    if (!form.password.trim()) {
      nextErrors.password = "Password is required";
    } else if (form.password.trim().length < 6) {
      nextErrors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(nextErrors).length) {
      setError(nextErrors);
      return;
    }

    setError({});

    try {
      await register(form);
      navigate("/");
    } catch (err) {
      setError({ form: err.response?.data?.message || "Unable to create account" });
    }
  };

  return (
    <AuthLayout
      title="Create account"
      subtitle="Start tracking income and expenses with a secure personal workspace."
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <Input
          label="Full name"
          placeholder="Aarav Sharma"
          value={form.name}
          onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          error={error.name}
        />
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
          placeholder="At least 6 characters"
          value={form.password}
          onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
          error={error.password}
        />
        {error.form ? <p className="text-sm text-rose-500">{error.form}</p> : null}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Create account"}
        </Button>
      </form>
      <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
        Already registered?{" "}
        <Link className="font-semibold text-brand-600 dark:text-brand-300" to="/login">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
};

export default RegisterPage;
