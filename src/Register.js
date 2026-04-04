import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "./Register.css"

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', role: 'user' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://reactipl2025backend.vercel.app/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        navigate('/');
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong!');
    }
  };

  return (
    <section className="register-page page-shell">
      <div className="register-container glass-panel">
        <div className="register-copy">
          <span className="section-badge">New Season Setup</span>
          <h2 className="section-title">Create your account and step into a brighter IPL control room.</h2>
          <p className="section-copy">
            Save picks, follow fixtures, and move through the tournament with a cleaner, more premium fan experience.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="form register-form">
          <label>
            <span>Email</span>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            <span>Password</span>
            <input
              type="password"
              name="password"
              placeholder="Choose a secure password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>
          <input type="hidden" name="role" value="user" />
          <button type="submit">Create Account</button>
        </form>
        <p className="redirect">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
