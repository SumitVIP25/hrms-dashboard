import { useNavigate } from "react-router-dom";

export default function Navbar() {
    console.log("Navbar Render");

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userEmail");

        navigate("/");
    };

    return (
        <div className="bg-white shadow-sm p-3 d-flex justify-content-between">
            <h5>Dashboard</h5>
            <button className="btn btn-danger btn-sm"
                onClick={handleLogout}>Logout</button>
        </div>
    );
}