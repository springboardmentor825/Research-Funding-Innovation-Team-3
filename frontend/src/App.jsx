import { useState, useEffect } from "react";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

function App() {
  const [showRegister, setShowRegister] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    const stored = localStorage.getItem("token");
    if (stored) setToken(stored);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  if (token) {
    return (
      <div>
        <Profile token={token} onLogout={handleLogout} />
      </div>
    );
  }

  return (
    <div>
      {showRegister ? (
        <Register onSwitchToLogin={() => setShowRegister(false)} />
      ) : (
        <Login
          onSwitchToRegister={() => setShowRegister(true)}
          onLoginSuccess={(t) => setToken(t)}
        />
      )}
    </div>
  );
}

export default App;