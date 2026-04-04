// import React, { useState } from "react";
// import "./Login.css";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();

//     if (email === "admin@example.com" && password === "admin123") {
//       navigate("/admin");
//     } else if (email === "user@example.com" && password === "user123") {
//       navigate("/user");
//     } else {
//       alert("Invalid credentials");
//     }
//   };

//   return (
//     <div className="login-container">
//       <form className="login-form" onSubmit={handleLogin}>
//         <h2>Login</h2>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;


// src/pages/Login.jsx
import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("https://reactipl2025backend.vercel.app/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (res.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("role", data.userData.role);
                localStorage.setItem("email", data.userData.email);
                if (data.userData.role === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/user");
                }
            } else {
                alert(data.message || "Login failed");
            }
        } catch (err) {
            console.error(err);
            alert("Error logging in.");
        }


        // if (formData.email === "admin@example.com" && formData.password === "admin123") {
        //     navigate("/admin");
        // } else if (formData.email === "user@example.com" && formData.password === "user123") {
        //     navigate("/user");
        // } else {
        //     alert("Invalid credentials");
        // }
    };

    return (
        <section className="auth-page page-shell">
            <div className="auth-layout">
                <div className="auth-copy">
                    <span className="section-badge">IPL Intelligence Hub</span>
                    <h1 className="section-title">Track fixtures, read form, and make every match feel electric.</h1>
                    <p className="section-copy">
                        A sharper IPL experience with live match context, predictions, betting flows, and a cleaner
                        modern dashboard for every fan.
                    </p>
                    <div className="auth-stats">
                        <div className="stat-chip">
                            <strong>74</strong>
                            <span>Matches to follow</span>
                        </div>
                        <div className="stat-chip">
                            <strong>10</strong>
                            <span>Teams in the title race</span>
                        </div>
                        <div className="stat-chip">
                            <strong>Live</strong>
                            <span>Scores and predictions</span>
                        </div>
                    </div>
                </div>

                <div className="login-container glass-panel">
                    <form className="login-form" onSubmit={handleLogin}>
                        <div className="form-heading">
                            <p className="form-kicker">Welcome back</p>
                            <h2>Sign in to your IPL space</h2>
                        </div>
                        <label>
                            <span>Email</span>
                            <input type="email" name="email" placeholder="you@example.com" onChange={handleChange} required />
                        </label>
                        <label>
                            <span>Password</span>
                            <input type="password" name="password" placeholder="Enter your password" onChange={handleChange} required />
                        </label>
                        <button type="submit">Enter Dashboard</button>
                        <p className="auth-link-text">
                            New here? <Link to="/register">Create an account</Link>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Login;
