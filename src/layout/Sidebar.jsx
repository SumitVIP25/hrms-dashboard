export default function Sidebar() {
    return (
        <div className="sidebar bg-dark text-white p-3"
            style={{ width: "250px", minHeight: "100vh" }}
        >
            <h4 className="mb-4">HRMS</h4>
            <ul className="list-unstyled">
                <li className="mb-3">Dashboard</li>
                <li className="mb-3">Employees</li>
                <li className="mb-3">Attendance</li>
                <li className="mb-3">Leaves</li>
            </ul>
        </div >);
}
