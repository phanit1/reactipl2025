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
import { useNavigate } from "react-router-dom";

function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleLogin = async (e) => {
        e.preventDefault();

        // try {
        //     const res = await fetch("http://localhost:5000/api/login", {
        //         method: "POST",
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify(formData),
        //     });

        //     const data = await res.json();

        //     if (res.ok) {
        //         localStorage.setItem("token", data.token);
        //         localStorage.setItem("role", data.role);
        //         localStorage.setItem("email", data.email);

        //         if (data.role === "admin") {
        //             navigate("/admin");
        //         } else {
        //             navigate("/user");
        //         }
        //     } else {
        //         alert(data.message || "Login failed");
        //     }
        // } catch (err) {
        //     console.error(err);
        //     alert("Error logging in.");
        // }


        if (formData.email === "admin@example.com" && formData.password === "admin123") {
            navigate("/admin");
        } else if (formData.email === "user@example.com" && formData.password === "user123") {
            navigate("/user");
        } else {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h2>Login</h2>
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
