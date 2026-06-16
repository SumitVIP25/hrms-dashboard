import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import "../CSS/Tables.css";
import "../CSS/Payroll.css";

export default function Payroll() {

    const [employees, setEmployees] = useState([]);
    const [payrolls, setPayrolls] = useState([]);
    const [editPayrollId, setEditPayrollId] = useState(null);
    const [employeeId, setEmployeeId] = useState("");
    const [basicSalary, setBasicSalary] = useState("");
    const [bonus, setBonus] = useState("");

    useEffect(() => {
        const storedEmployees = localStorage.getItem("employees");

        if (storedEmployees) {
            setEmployees(JSON.parse(storedEmployees));
        }
    }, []);

    useEffect(() => {
        const storedPayroll = localStorage.getItem("payrolls");

        if (storedPayroll) {
            setPayrolls(JSON.parse(storedPayroll));
        }
    }, []);

    const handleAddPayroll = () => {
        if (
            employeeId === "" || basicSalary === ""
        ) {

            alert("Please fill all required fields");
            return;
        }
        const existingPayroll = payrolls.find((payroll) => payroll.employeeId === Number(employeeId));
        if (existingPayroll && existingPayroll.id !== editPayrollId) {
            alert("Payroll already exist for this employee.");
            return;
        }

        const totalSalary = Number(basicSalary) + Number(bonus || 0);

        const selectedEmployee = employees.find((employee) => employee.id === Number(employeeId));
        const newPayroll = {
            id: Date.now(),
            employeeId: Number(employeeId),
            employeeName: selectedEmployee.name,
            basicSalary: Number(basicSalary),
            bonus: Number(bonus || 0),
            totalSalary,
        }

        let updatedPayrolls;

        if (editPayrollId) {
            updatedPayrolls = payrolls.map((payroll) => payroll.id === editPayrollId ?
                { ...newPayroll, editPayrollId } : payroll);
        } else {
            updatedPayrolls = [...payrolls, newPayroll,];
        }

        setPayrolls(updatedPayrolls);

        localStorage.setItem("payrolls", JSON.stringify(updatedPayrolls));

        setEmployeeId("");
        setBasicSalary("");
        setBonus("");
        setEditPayrollId(null);
    };

    const handleEditPayroll = (payroll) => {

        setEmployeeId(payroll.employeeId.toString());

        setBasicSalary(payroll.basicSalary.toString());

        setBonus(payroll.bonus.toString());

        setEditPayrollId(payroll.id);
    };

    const handleDeletePayroll = (id) => {
        const updatedPayrolls = payrolls.filter((payroll) => payroll.id !== id);
        setPayrolls(updatedPayrolls);

        localStorage.setItem("payrolls", JSON.stringify(updatedPayrolls));
    };



    return (
        <MainLayout>
            <div className="container-fluid">
                <div className="mb-4">
                    <h2 className="payroll-title">Payroll Management</h2>
                    <p className="payroll-subtitle">Manage employee salaries and payroll records.</p>
                </div>

                <div className="row g-3 mb-4">

                    <div className="col-md-4">
                        <div className="payroll-card payroll-blue">
                            <h6>Total Payroll Records</h6>
                            <h3>{payrolls.length}</h3>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="payroll-card payroll-green">
                            <h6>Total Salary Paid</h6>
                            <h3>
                                ₹ {payrolls.reduce((sum, payroll) => sum + payroll.totalSalary, 0)}
                            </h3>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="payroll-card payroll-purple">
                            <h6>Average Salary</h6>
                            <h3>
                                ₹ {
                                    payrolls.length > 0 ? Math.round(payrolls.reduce((sum, payroll) => sum + payroll.totalSalary, 0) / payrolls.length) : 0
                                }
                            </h3>
                        </div>
                    </div>
                </div>

                <h4 className="payroll-section-title">Generate Payroll</h4>
                <div className="payroll-form-card">
                    <div className="row g-3">
                        <div className="col-12 col-sm-6 col-md-4">
                            <label className="form-label">
                                Employee
                            </label>

                            <select
                                className="form-select"
                                value={employeeId}
                                onChange={(e) => setEmployeeId(e.target.value)
                                }>
                                <option value="">
                                    Select Employee
                                </option>


                                {employees.map((employee) => (
                                    <option key={employee.id}
                                        value={employee.id}
                                    >
                                        {employee.name}
                                    </option>
                                ))}
                            </select>
                        </div>


                        <div className="col-12 col-sm-6 col-md-4">
                            <label className="form-label">
                                Basic Salary
                            </label>

                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter Basic Salary"
                                value={basicSalary}
                                onChange={(e) => setBasicSalary(e.target.value)}
                            />

                        </div>

                        <div className="col-12 col-sm-6 col-md-4">
                            <label className="form-label">
                                Bonus
                            </label>

                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter Bonus Amount"
                                value={bonus}
                                onChange={(e) => setBonus(e.target.value)}
                            />

                        </div>

                        <div className="col-12 text-end">
                            <button className="btn btn-primary"
                                onClick={handleAddPayroll}>{editPayrollId ? "Updated Payroll" : "Add Payroll"}</button>
                        </div>
                    </div>

                </div>

                <div className="payroll-table-card mt-4">
                    <h4 className="payroll-section-title">Payroll Records</h4>

                    <div className="table-wrapper">
                        <table className="table custom-table align-middle">
                            <thead>
                                <tr>
                                    <th>S.No.</th>
                                    <th>Employee</th>
                                    <th>Basic Salary</th>
                                    <th>Bonus</th>
                                    <th>Total Salary</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {payrolls.length > 0 ? (
                                    payrolls.map((payroll, index) => (
                                        <tr key={payroll.id}>
                                            <td>{index + 1}</td>
                                            <td>{payroll.employeeName}</td>
                                            <td>₹{payroll.basicSalary}</td>
                                            <td>₹{payroll.bonus}</td>
                                            <td><strong>₹{payroll.totalSalary}</strong></td>

                                            <td>
                                                <button className="payroll-btn payroll-edit"
                                                    onClick={() => handleEditPayroll(payroll)}
                                                >Edit</button>

                                                <button className="payroll-btn payroll-delete"
                                                    onClick={() => handleDeletePayroll(payroll.id)}
                                                >Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="text-center text-muted"
                                        >
                                            No payroll records found.
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