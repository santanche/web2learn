import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
// import jwtDecode from 'jwt-decode';

const GOOGLE_CLIENT_ID = ''; // Get this from Google Cloud Console
const API_URL = 'http://localhost:8000/api/auth/google/'; // Your Django endpoint

function GoogleAuthComponent() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem('authToken');
    if (token) {
      fetchUserProfile(token);
    }
  }, []);

  const fetchUserProfile = async (token) => {
    try {
      const response = await axios.get('http://localhost:8000/api/user/profile/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
    } catch (err) {
      console.error('Error fetching user profile:', err);
      localStorage.removeItem('authToken');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    setError(null);
    
    try {
      // Send Google token to your Django backend
      const response = await axios.post(API_URL, {
        token: credentialResponse.credential
      });
      
      // Store the authentication token from your backend
      localStorage.setItem('authToken', response.data.token);
      
      // Get user info
      setUser(response.data.user);
    } catch (err) {
      setError('Authentication failed. Please try again.');
      console.error('Google auth error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError('Google Sign-in was unsuccessful');
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return (
    <div className="auth-container">
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      
      {!user ? (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap
            width="300px"
          />
        </GoogleOAuthProvider>
      ) : (
        <div className="user-profile">
          <h2>Welcome, {user.name}</h2>
          <p>Email: {user.email}</p>
          {user.picture && <img src={user.picture} alt={user.name} />}
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

// Main App component wrapping the auth component
function App() {
  return (
    <div className="app">
      <h1>Google Authentication Demo</h1>
      <GoogleAuthComponent />
    </div>
  );
}

export default App;