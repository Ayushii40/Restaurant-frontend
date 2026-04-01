import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { fetchUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/v1/user/login`,
        { email, password },
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        }
      );
      toast.success(response.data.message);
      setEmail('');
      setPassword('');
      fetchUser();
      
      // Redirect based on role
      if (response.data.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="auth">
      <div className="container">
        <div className="banner">
          <img src="/sandwich.png" alt="login" />
        </div>
        <div className="banner">
          <div className="auth_form_box">
            <h1>LOGIN</h1>
            <p>Welcome back! Please enter your details.</p>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">LOGIN</button>
            </form>
            <p className="auth_redirect">
              Don't have an account? <Link to="/register">Register Now</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
