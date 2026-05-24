import { NavLink } from "react-router-dom";

export default function Sidebar() {
    return (
        <div className="sidebar bg-dark text-white p-3"
            style={{ width: "250px", minHeight: "100vh" }}
        >
            <h4 className="mb-4">HRMS</h4>
            <ul className="list-unstyled">
                <li className="mb-3"><NavLink to="/dashboard" className={({ isActive }) => isActive ? "text-warning text-decoration-none" : "text-white text-decoration-none"}>Dashboard</NavLink></li>
                <li className="mb-3"> <NavLink to="/employees" className={({ isActive }) => isActive ? "text-warning text-decoration-none" : "text-white text-decoration-none"}>Employees</NavLink></li>
                <li className="mb-3"> <NavLink to="/attendance" className="text-white text-decoration-none">Attendance</NavLink></li>
                <li className="mb-3"><NavLink to="/leaves" className="text-white text-decoration-none">Leaves</NavLink></li>
            </ul>
        </div >);
}
