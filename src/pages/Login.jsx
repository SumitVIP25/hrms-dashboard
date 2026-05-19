import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light">
            <div className="card shadow p-4" style={{ width: "400px" }}>
                <h2 className="text-center mb-4">HRMS Login</h2>
                <p className="text-center mb-2">Welcome back! Please login.</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label>Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
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

                    <button className="btn btn-primary w-100 mb-3">Login</button>
                </form>
            </div>
        </div>
    );
}