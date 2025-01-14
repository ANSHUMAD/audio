import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const server_url=import.meta.env.VITE_BACKEND

const SignUp = () => {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    mail: '',
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
      const response = await axios.post(`${server_url}/signup`, formData, {
        headers: {
          'Content-Type': 'application/json', // Explicitly set content type to JSON
        },
      });
      console.log('Login successful', response.data);
      navigate('/homepage', { state: response.data });
      console.log('Form submitted successfully', response.data);
    } catch (error) {
      console.error('Error submitting form', error);
      
    }
  };

  return (
      <div className='signup'>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Create a username</label>
            <input
              type="text"
              id="name"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <br />
            <label htmlFor="pwd">Choose a password</label>
            <input
              type="password"
              id="pwd"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <br />
            <label htmlFor="mail">Enter your email</label>
            <input
              type="email"
              id="mail"
              name="mail"
              value={formData.mail}
              onChange={handleChange}
              required
            />
            <br />
            <button type="submit">Submit</button>
          </form>
      </div>
  );
};

export default SignUp;
