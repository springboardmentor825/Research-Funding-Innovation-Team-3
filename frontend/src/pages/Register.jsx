import { useState } from "react";
import { registerUser } from "../services/api";

function Register({ onSwitchToLogin }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Researcher");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await registerUser({ full_name: fullName, email, password, role });
      setSuccess(true);
    } catch (err) {
      setError("Registration failed. Email may already be in use.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <h1>InnovaFund</h1>
        <p>Create your research intelligence account</p>
      </div>

      <div className="social-buttons">
        <button type="button" className="btn-social" disabled title="Coming soon">
          Sign up with Google
        </button>
        <button type="button" className="btn-social" disabled title="Coming soon">
          Sign up with GitHub
        </button>
      </div>

      <div className="divider"><span>or register with email</span></div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Jane Doe"
            required
          />
        </div>
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
        <div className="form-group">
          <label>Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #e5e7eb", borderRadius: "8px", fontSize: "14px" }}
          >
            <option>Researcher</option>
            <option>Startup Founder</option>
            <option>Innovation Manager</option>
            <option>Administrator</option>
          </select>
        </div>
        <button type="submit" className="btn-primary">Register</button>
      </form>

      {error && <p className="error-msg">{error}</p>}
      {success && <p className="success-msg">Account created! You can now log in.</p>}

      <p className="switch-auth">
        Already have an account? <a onClick={onSwitchToLogin}>Login</a>
      </p>
    </div>
  );
}

export default Register;
