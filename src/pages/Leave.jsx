import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import "../CSS/Tables.css";
import "../CSS/Leave.css";

export default function Leave() {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [employees, setEmployees] = useState([]);

    const [employeeId, setEmployeeId] = useState("");
    const [leaveType, setLeaveType] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [reason, setReason] = useState("");

    useEffect(() => {
        const storedEmployees = localStorage.getItem("employees");

        if (storedEmployees) {
            setEmployees(JSON.parse(storedEmployees));
        }
    }, []);

    const handleApplyLeave = () => {
        if (
            employeeId === "" ||
            leaveType === "" ||
            fromDate === "" ||
            toDate === "" ||
            reason.trim() === ""
        ) {
            alert("Please fill all fields");
            return;
        }
        const selectedEmployee = employees.find((employee) => employee.id === Number(employeeId));

        const newLeave = {
            id: Date.now(),
            employeeId: Number(employeeId),
            employeeName: selectedEmployee.name,
            leaveType,
            fromDate,
            toDate,
            reason,
            status: "Pending",
        };

        const updatedLeaves = [...leaveRequests, newLeave];

        setLeaveRequests(updatedLeaves);

        localStorage.setItem("leaveRequests", JSON.stringify(updatedLeaves));

        setEmployeeId("");
        setLeaveType("");
        setFromDate("");
        setToDate("");
        setReason("");
    }


    useEffect(() => {
        const storedLeaves = localStorage.getItem("leaveRequests");

        if (storedLeaves) {
            setLeaveRequests(JSON.parse(storedLeaves));
        }
    }, []);

    const pendingCount = leaveRequests.filter((leave) => leave.status === "Pending").length;
    const approvedCount = leaveRequests.filter((leave) => leave.status === "Approved").length;
    const rejectedCount = leaveRequests.filter((leave) => leave.status === "Rejected").length;

    const handleLeaveStatus = (id, status) => {
        const updatedLeaves = leaveRequests.map((leave) =>
            leave.id === id ? { ...leave, status } : leave);

        setLeaveRequests(updatedLeaves);

        localStorage.setItem("leaveRequests", JSON.stringify(updatedLeaves)
        );
    };



    return (
        <MainLayout>
            <div className="container">
                <div className="mb-4">
                    <h2 className="mb-4">Leave Management</h2>
                    <p className="leave-subtitle">Manage employee leave requests and approvals efficiently.</p>
                </div>

                <div className="row g-3 mb-4">
                    <div className="col-md-4">
                        <div className="leave-card leave-yellow">
                            <h6>Pending</h6>
                            <h3>{pendingCount}</h3>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="leave-card leave-green">
                            <h6>Approved</h6>
                            <h3>{approvedCount}</h3>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="leave-card leave-red">
                            <h6>Rejected</h6>
                            <h3>{rejectedCount}</h3>
                        </div>
                    </div>
                </div>

                <div className="leave-form-card">
                    <h4 className="leave-section-title">Apply Leaves</h4>

                    <div className="row g-3">
                        <div className="col-md-6">
                            <select
                                className="form-select"
                                value={employeeId}
                                onChange={(e) => setEmployeeId(e.target.value)} >
                                <option value="">
                                    Select Employee
                                </option>

                                {employees.map((employee) => (
                                    <option
                                        key={employee.id}
                                        value={employee.id}>
                                        {employee.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-6">
                            <select
                                className="form-select"
                                value={leaveType}
                                onChange={(e) => setLeaveType(e.target.value)}
                            >
                                <option value="">Select Leave Type</option>
                                <option value="Sick Leave">Sick Leave</option>
                                <option value="Casual Leave">Casual Leave</option>
                                <option value="Earned Leave">Earned Leave</option>
                            </select>
                        </div>

                        <div className="col-md-6">
                            <input
                                type="date"
                                className="form-control"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                            />
                        </div>

                        <div className="col-md-6">
                            <input
                                type="date"
                                className="form-control"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                            />
                        </div>

                        <div className="col-md-12">
                            <textarea
                                className="form-control"
                                rows="3"
                                placeholder="Enter reason"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}></textarea>
                        </div>

                        <div className="col-md-12">
                            <button
                                className="btn btn-primary"
                                onClick={handleApplyLeave}
                            >Apply Leave</button>
                        </div>
                    </div>
                </div>


                <div className="leave-table-card mt-4">
                    <h4 className="leave-section-title">Leave Requests</h4>

                    <div className="table-responsive">
                        <table className="table custom-table align-middle">
                            <thead>
                                <tr>
                                    <th>S.no</th>
                                    <th>Employee</th>
                                    <th>Leave Type</th>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {leaveRequests.map((leave, index) => (
                                    <tr key={leave.id}>
                                        <td>{index + 1}</td>
                                        <td>{leave.employeeName}</td>
                                        <td>{leave.leaveType}</td>
                                        <td>{leave.fromDate}</td>
                                        <td>{leave.toDate}</td>
                                        <td>
                                            <span className={
                                                leave.status === "Approved"
                                                    ? "leave-status approved"
                                                    : leave.status === "Rejected"
                                                        ? "leave-status rejected"
                                                        : "leave-status pending"}
                                            >
                                                {leave.status}
                                            </span>
                                        </td>

                                        <td>
                                            <button className="leave-btn leave-approve"
                                                onClick={() => handleLeaveStatus(leave.id, "Approved")}
                                            >Approved
                                            </button>

                                            <button className="leave-btn leave-reject"
                                                onClick={() => handleLeaveStatus(leave.id, "Rejected")}
                                            >Rejected</button>
                                        </td>
                                    </tr>
                                ))

                                }
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>









        </MainLayout>
    )
}