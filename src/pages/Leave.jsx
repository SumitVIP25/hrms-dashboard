import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";

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
                <h3 className="mb-4">Leave Management Page</h3>

                <div className="row mb-4">
                    <div className="col-md-4">
                        <div className="card p-3">
                            <h6>Pending</h6>
                            <h3>{pendingCount}</h3>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card p-3">
                            <h6>Approved</h6>
                            <h3>{approvedCount}</h3>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card p-3">
                            <h6>Rejected</h6>
                            <h3>{rejectedCount}</h3>
                        </div>
                    </div>
                </div>

                <div className="card p-4">
                    <h4 className="mb-3">Apply Leaves</h4>

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


                <div className="card p-4 mt-4">
                    <h4 className="mb-3">Leave Requests</h4>

                    <table className="table table-hover align-middle">
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
                                        <span className={`badge ${leave.status === "Approved"
                                            ? "bg-success"
                                            : leave.status === "Rejected"
                                                ? "bg-danger"
                                                : "bg-warning"
                                            }`}
                                        >
                                            {leave.status}
                                        </span>
                                    </td>

                                    <td>
                                        <button className="btn btn-success btn-sm me-2"
                                            onClick={() => handleLeaveStatus(leave.id, "Approved")}
                                        >Approved
                                        </button>

                                        <button className="btn btn-danger btn-sm"
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









        </MainLayout>
    )
}