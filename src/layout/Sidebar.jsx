import { NavLink } from "react-router-dom";
import "../CSS/Sidebar.css";



export default function Sidebar() {
    return (
        <div className="sidebar p-3 flex-shrink-0"
            style={{ width: "190px", minHeight: "100vh", flexShrink: 0 }}
        >
            <h4>HRMS</h4>
            <ul className="list-unstyled">
                <li className="mb-3"><NavLink to="/dashboard" className={({ isActive }) => `sidebar-link ${isActive ? "active-link" : ""}`}>Dashboard</NavLink></li>
                <li className="mb-3"> <NavLink to="/employees" className={({ isActive }) => `sidebar-link ${isActive ? "active-link" : ""}`}>Employees</NavLink></li>
                <li className="mb-3"><NavLink to="/attendance" className={({ isActive }) => `sidebar-link ${isActive ? "active-link" : ""}`}>Attendance</NavLink></li>
                <li className="mb-3"><NavLink to="/leave" className={({ isActive }) => `sidebar-link ${isActive ? "active-link" : ""}`}>Leave Management</NavLink></li>
                <li className="mb-3"><NavLink to="/payroll" className={({ isActive }) => `sidebar-link ${isActive ? "active-link" : ""}`}>Payroll</NavLink></li>
                <li className="mb-3"><NavLink to="/reports" className={({ isActive }) => `sidebar-link ${isActive ? "active-link" : ""}`}>Reports</NavLink></li>
                <li className="mb-3"><NavLink to="/settings" className={({ isActive }) => `sidebar-link ${isActive ? "active-link" : ""}`}>Settings</NavLink></li>
            </ul>
        </div>);
}
