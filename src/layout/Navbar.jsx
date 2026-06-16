import { useNavigate } from "react-router-dom";
import "../CSS/Navbar.css";

export default function Navbar({ setSidebarOpen }) {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userEmail");

        navigate("/");
    };

    return (
        <div className="navbar-custom">

            {/* Left Section */}
            <div className="navbar-left">

                {/* Mobile Hamburger */}
                <button
                    className="menu-btn"
                    onClick={() => setSidebarOpen(true)}
                >
                    ☰
                </button>

                <div>
                    <h5 className="mb-0 fw-bold">
                        Welcome, HR Admin
                    </h5>

                    <small className="text-muted">
                        Human Resource Management System
                    </small>
                </div>

            </div>

            {/* Right Section */}
            <div className="navbar-right">

                <div className="profile-avatar">
                    HR
                </div>

                <span className="fw-semibold admin-name">
                    HR Admin
                </span>

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

        </div>
    );
}