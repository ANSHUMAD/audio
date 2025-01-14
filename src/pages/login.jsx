import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const server_url=import.meta.env.VITE_BACKEND


const Login = () => {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${server_url}/login`, formData, {
        headers: {
          'Content-Type': 'application/json', // Explicitly set content type to JSON
        },
      });
      console.log('Login successful', response.data);
      navigate('/homepage', { state: response.data });
    } catch (error) {
      console.error('Error during login', error);
    }
  };

  return (
    <div className='login'>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Enter your username</label>
          <input
            type="text"
            id="name"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="pwd">Enter password</label>
          <input
            type="password"
            id="pwd"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <br />
          <button type="submit">Submit</button>
        </form>
    </div>
  );
};

export default Login;
