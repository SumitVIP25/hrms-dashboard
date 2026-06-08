import { useEffect, useState } from "react"
import MainLayout from "../layout/MainLayout"

export default function Attendance() {
    const [attendance, setAttendance] = useState([]);
    const [employees, setEmployees] = useState([]);



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

    return (
        <MainLayout>
            <div className="container">
                <h3 className="mb-4">Attendance</h3>
                <p>Total Employees: {employees.length}</p>
                <table className="table table-hover">
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
                        {employees.map((employee, index) => (
                            <tr key={employee.index}>
                                <td>{employee.id}</td>
                                <td>{employee.name}</td>
                                <td>{new Date().toLocaleDateString()}</td>
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

                                <td>
                                    <button className="btn btn-success btn-sm me-1"
                                        onClick={() => handleAttendenceStatus(employee.id, "Present")}>Present</button>

                                    <button className="btn btn-danger btn-sm me-1"
                                        onClick={() => handleAttendenceStatus(employee.id, "Absent")}>Absent</button>

                                    <button className="btn btn-warning btn-sm"
                                        onClick={() => handleAttendenceStatus(employee.id, "Leave")}>Leave</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </MainLayout>
    )
}