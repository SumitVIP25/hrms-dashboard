import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import InputField from "../components/inputField";
import "../CSS/Login.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();

        const storedEmail = localStorage.getItem("userEmail") || "admin@hrms.com";
        const storedPassword = localStorage.getItem("userPassword") || "admin123";

        if (email.trim() === storedEmail &&
            password === storedPassword) {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userEmail", storedEmail);

            navigate("/dashboard");

        } else {
            alert("Invalid email or password");
        }
    };


    return (
        <div className="login-container">
            <div className="login-card">
                <div className="text-center mb-4">
                    <h2 className="login-title">HRMS Portal</h2>
                    <p className="login-subtitle">Welcome back <br /> Sign in to continue</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <InputField
                            label="Email"
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <InputField
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        <button type="button" className="btn btn-sm btn-secondary mt-2"
                            onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide Password" : " Show Password"}</button>
                    </div>

                    <div className="text-end mb-3">
                        <a href="#" className="text-decoration-none">Forgot Password?</a>
                    </div>

                    <button className="btn login-btn w-100 mb-3">Login</button>
                </form>
            </div >
        </div >
    );
}