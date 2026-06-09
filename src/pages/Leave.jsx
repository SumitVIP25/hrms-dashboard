import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";

export default function Leave() {
    const [leaveRequest, setLeaveRequest] = useState([]);
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
        alert("Validation Passed")
    }


    return (
        <MainLayout>
            <div className="container">
                <h3 className="mb-4">Leave Management Page</h3>
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









        </MainLayout>
    )
}