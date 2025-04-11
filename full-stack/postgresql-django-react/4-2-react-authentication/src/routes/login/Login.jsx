import React, { useState, useEffect } from 'react'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import '../../App.css'

const API_URL = `${import.meta.env.VITE_SERVER_URL}/auth/google/` // Django endpoint

function GoogleAuthComponent() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem('authToken')
    if (token) {
      fetchUserProfile(token)
    }
  }, [])

  const fetchUserProfile = async (token) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/person/`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUser(response.data)
    } catch (err) {
      console.error('Error fetching user profile:', err)
      localStorage.removeItem('authToken')
    }
  }

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true)
    setError(null)
    
    try {
      // Send Google token to your Django backend
      const response = await axios.post(API_URL, {
        token: credentialResponse.credential
      })
      
      // Store the authentication token from your backend
      localStorage.setItem('authToken', response.data.token)
      
      // Get user info
      setUser(response.data.user)
    } catch (err) {
      setError('Authentication failed. Please try again.')
      console.error('Google auth error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleError = () => {
    setError('Google Sign-in was unsuccessful')
    setLoading(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    setUser(null)
  }

  return (
    <div className="auth-container">
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      
      {!user ? (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
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
          <hr/>
          <a href="/person">Go to the List of Persons</a>
        </div>
      )}
    </div>
  )
}

function Login() {
  return (
    <div className="app">
      <h1>Google Authentication</h1>
      <GoogleAuthComponent />
    </div>
  )
}

export default Login
