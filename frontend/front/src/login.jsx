// Import necessary dependencies
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

function Login() {
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Perform login operation (axios post request, etc.)
      const res = await axios.post('http://127.0.0.1:8000/space/login/', formData);
      
      // Check if login is successful (you may need to adjust the condition based on your API response)
      if (res.status === 200) {
        // Store the authentication token in localStorage
        localStorage.setItem('token', res.data.token);
        
        // Redirect to PersonalSpace page on successful login
        navigate('/PersonalSpace');
      } else {
        // Handle login failure (display error message, etc.)
        console.log('Login failed');
      }
    } catch (error) {
      console.error(error);
      // Handle error (display error message, etc.)
    }
  };
  

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
