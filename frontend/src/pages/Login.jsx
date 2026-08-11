import { useState } from "react";
import { loginUser } from "../services/api";

function Login({ onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await loginUser({ email, password });
      setToken(response.data.access_token);
      localStorage.setItem("token", response.data.access_token);
      if (onLoginSuccess) onLoginSuccess(response.data.access_token);
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="auth-page">
    <div className="auth-container">
      <div className="auth-header">
        <h1>InnovaFund</h1>
        <p>Sign in to your research intelligence dashboard</p>
      </div>

      <div className="social-buttons">
        <button type="button" className="btn-social" disabled title="Coming soon">
          Continue with Google
        </button>
        <button type="button" className="btn-social" disabled title="Coming soon">
          Continue with GitHub
        </button>
      </div>

      <div className="divider"><span>or sign in with email</span></div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>
        <button type="submit" className="btn-primary">Login</button>
      </form>

      {error && <p className="error-msg">{error}</p>}
      {token && <p className="success-msg">Logged in! Token saved.</p>}

      <p className="switch-auth">
        New user? <a onClick={onSwitchToRegister}>Register</a>
      </p>
    </div>
    </div>
  );
}

export default Login;