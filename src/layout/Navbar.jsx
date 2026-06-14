import { useNavigate } from "react-router-dom";
import "../CSS/Navbar.css";

export default function Navbar() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userEmail");

        navigate("/");
    };

    return (
        <div className="navbar-custom">
            <div>
                <h5 className="mb-0 fw-bold">Welcome, HR Admin</h5>
                <small className="text-muted">Human Resource Managememt System</small>
            </div>

            <div className="d-flex align-items-center gap-3">
                <div className="profile-avatar">HR</div>
                <span className="fw-semibold">HR Admin</span>

                <button className="logout-btn"
                    onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}