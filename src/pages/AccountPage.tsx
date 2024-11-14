import { useEffect, useState } from 'react';
import './AccountPage.css';

type UserData = {
  username: string;
  email: string;
};

const AccountPage = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:5000/users/1')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch user data');
        return res.json();
      })
      .then((data) => {
        setUserData({ username: data.username, email: data.email });
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch data',err.message)
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h2 className="signin-title">
          {loading ? 'Loading...' : error ? `Error: ${error}` : `Welcome, ${userData?.username}!`}
        </h2>
        <p className="signin-subtitle">
          {loading || error ? '' : `Email: ${userData?.email}`}
        </p>
        <form className="signin-form">
          <label htmlFor="email" className="signin-label">Email</label>
          <input type="email" id="email" name="email" className="signin-input" required />

          <label htmlFor="password" className="signin-label">Password</label>
          <input type="password" id="password" name="password" className="signin-input" required />

          <button type="submit" className="signin-button">Sign In</button>
        </form>
        <p className="signin-footer">
          Don’t have an account? <a href="/signup" className="signin-link">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default AccountPage;
