import { NavLink } from "react-router-dom";

export default function Sidebar() {
    console.log("Sidebar Render");
    return (
        <div className="sidebar bg-dark text-white p-3 flex-shrink-0"
            style={{ width: "190px", minHeight: "100vh", flexShrink: 0 }}
        >
            <h4 className="mb-4">HRMS</h4>
            <ul className="list-unstyled">
                <li className="mb-3"><NavLink to="/dashboard" className={({ isActive }) => isActive ? "text-warning text-decoration-none" : "text-white text-decoration-none"}>Dashboard</NavLink></li>
                <li className="mb-3"> <NavLink to="/employees" className={({ isActive }) => isActive ? "text-warning text-decoration-none" : "text-white text-decoration-none"}>Employees</NavLink></li>
                <li className="mb-3"><NavLink to="/attendance" className={({ isActive }) => isActive ? "text-warning text-decoration-none" : "text-white text-decoration-none"}>Attendance</NavLink></li>
                <li className="mb-3"><NavLink to="/leave" className={({ isActive }) => isActive ? "text-warning text-decoration-none" : "text-white text-decoration-none"}>Leave Management</NavLink></li>
                <li className="mb-3"><NavLink to="/payroll" className={({ isActive }) => isActive ? "text-warning text-decoration-none" : "text-white text-decoration-none"}>Payroll</NavLink></li>
                <li className="mb-3"><NavLink to="/reports" className={({ isActive }) => isActive ? "text-warning text-decoration-none" : "text-white text-decoration-none"}>Reports</NavLink></li>
                <li className="mb-3"><NavLink to="/settings" className={({ isActive }) => isActive ? "text-warning text-decoration-none" : "text-white text-decoration-none"}>Settings</NavLink></li>
            </ul>
        </div >);
}
