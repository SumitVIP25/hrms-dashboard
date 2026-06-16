import { NavLink } from "react-router-dom";
import "../CSS/Sidebar.css";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {

    const closeSidebar = () => {
        if (window.innerWidth < 768) {
            setSidebarOpen(false);
        }
    };

    return (
        <div
            className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}
        >
            <div className="sidebar-header">
                <h4>HRMS</h4>

                <button
                    className="close-sidebar"
                    onClick={() => setSidebarOpen(false)}
                >
                    ✕
                </button>
            </div>

            <ul className="list-unstyled">

                <li>
                    <NavLink
                        to="/dashboard"
                        onClick={closeSidebar}
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? "active-link" : ""}`
                        }
                    >
                        Dashboard
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/employees"
                        onClick={closeSidebar}
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? "active-link" : ""}`
                        }
                    >
                        Employees
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/attendance"
                        onClick={closeSidebar}
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? "active-link" : ""}`
                        }
                    >
                        Attendance
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/leave"
                        onClick={closeSidebar}
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? "active-link" : ""}`
                        }
                    >
                        Leave Management
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/payroll"
                        onClick={closeSidebar}
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? "active-link" : ""}`
                        }
                    >
                        Payroll
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/reports"
                        onClick={closeSidebar}
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? "active-link" : ""}`
                        }
                    >
                        Reports
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/settings"
                        onClick={closeSidebar}
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? "active-link" : ""}`
                        }
                    >
                        Settings
                    </NavLink>
                </li>

            </ul>
        </div>
    );
}