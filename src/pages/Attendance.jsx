import { useEffect, useState } from "react"
import MainLayout from "../layout/MainLayout"
import "../CSS/Tables.css";

export default function Attendance() {
    const [attendance, setAttendance] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");



    useEffect(() => {
        const storedEmployees = localStorage.getItem("employees");

        if (storedEmployees) {
            setEmployees(JSON.parse(storedEmployees));
        }
    }, []);

    const handleAttendenceStatus = (id, status) => {
        const updatedEmployees = employees.map((employee) => employee.id === id ? { ...employee, attendanceStatus: status, } : employee
        );
        setEmployees(updatedEmployees);

        localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    };

    const presentCount = employees.filter((employee) => employee.attendanceStatus === "Present").length;
    const absentCount = employees.filter((employee) => employee.attendanceStatus === "Absent").length;
    const leaveCount = employees.filter((employee) => employee.attendanceStatus === "Leave").length;
    const notMarkedCount = employees.filter((employee) => !employee.attendanceStatus).length;

    const filteredEmployees = employees.filter((employee) => {
        const matchesSearch = employee.name.toLowerCase().includes(search.toLowerCase());
        const currentStatus = employee.attendanceStatus || "Not Marked";
        const matchesStatus = statusFilter === "All" || currentStatus === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <MainLayout>
            <div className="container-fluid">
                <h3 className="mb-4">Attendance</h3>

                <div className="row mb-3">
                    <div className="col-md-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search employee..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="col-md-3">
                        <select
                            className="form-select"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}>
                            <option value="All">All</option>
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                            <option value="Leave">Leave</option>
                            <option value="Not Marked">Not Marked</option>
                        </select>
                    </div>
                </div>

                <div className="row mb-4">

                    <div className="col-md-3">
                        <div className="card p-3">
                            <h6>Present</h6>
                            <h3>{presentCount}</h3>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card p-3">
                            <h6>Absent</h6>
                            <h3>{absentCount}</h3>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card p-3">
                            <h6>Leave</h6>
                            <h3>{leaveCount}</h3>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card p-3">
                            <h6>Not Marked</h6>
                            <h3>{notMarkedCount}</h3>
                        </div>
                    </div>
                </div>
                <p>Total Employees: {employees.length}</p>
                <div className="table-card p-4">
                    <div className="table-wrapper" style={{ minHeight: "500px" }}>
                        <table className="table custom-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredEmployees.length > 0 ? (
                                    filteredEmployees.map((employee, index) => (
                                        <tr key={employee.id}>
                                            <td className="text-nowrap">{employee.id}</td>
                                            <td className="text-nowrap">{employee.name}</td>
                                            <td className="text-nowrap">{new Date().toLocaleDateString()}</td>
                                            <td><span
                                                className={`badge ${employee.attendanceStatus === "Present"
                                                    ? "bg-success"
                                                    : employee.attendanceStatus === "Absent"
                                                        ? "bg-danger"
                                                        : employee.attendanceStatus === "Leave"
                                                            ? "bg-warning"
                                                            : "bg-secondary"
                                                    }`}
                                            >
                                                {employee.attendanceStatus || "Not Marked"}
                                            </span>
                                            </td>

                                            <td className="text-nowrap">

                                                <button className="btn btn-success btn-sm me-2"
                                                    onClick={() => handleAttendenceStatus(employee.id, "Present")}>Present</button>

                                                <button className="btn btn-danger btn-sm me-2"
                                                    onClick={() => handleAttendenceStatus(employee.id, "Absent")}>Absent</button>

                                                <button className="btn btn-warning btn-sm"
                                                    onClick={() => handleAttendenceStatus(employee.id, "Leave")}>Leave</button>

                                            </td>
                                        </tr>
                                    ))) : (
                                    <tr>
                                        <td
                                            colSpan="12"
                                            className="text-center text-muted py-4">No employee found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}