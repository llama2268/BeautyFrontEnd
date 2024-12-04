import { useState } from "react";
import "./AccountPage.css";
import { auth, googleProvider } from "./firebaseClient";
import { signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

type UserData = {
  username: string;
  email: string;
};

const AccountPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [googleUser, setGoogleUser] = useState<UserData | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    if (fieldName === "email") {
      setFormData({ email: fieldValue, password: formData.password });
    } else if (fieldName === "password") {
      setFormData({ email: formData.email, password: fieldValue });
    }
  };

  const normalLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        navigate("/");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      setGoogleUser({
        username: user.displayName || "Google User",
        email: user.email || "No Email",
      });
      setError(null);
      navigate("/");
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
      setError("Failed to sign in with Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h2 className="signin-title">Log In</h2>
        {error && <p className="signin-error">{error}</p>}
        <form className="signin-form" onSubmit={normalLogin}>
          <label htmlFor="email" className="signin-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="signin-input"
            value={formData.email}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="password" className="signin-label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="signin-input"
            value={formData.password}
            onChange={handleInputChange}
            required
          />

          <button type="submit" className="signin-button" disabled={loading}>
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>
        <p className="signin-footer">
          Don’t have an account? <Link to="/signup" className="signin-link">Sign up</Link>
        </p>
      </div>
      <div className="google-signin-box">
        <h3>Or Sign In with Google</h3>
        {googleUser ? (
          <p>Welcome, {googleUser.username}</p>
        ) : (
          <button onClick={handleGoogleLogin} className="google-button" disabled={loading}>
            {loading ? "Loading..." : "Sign In with Google"}
          </button>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
