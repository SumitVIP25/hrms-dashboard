import MainLayout from "../layout/MainLayout";
import DashboardCard from "../components/dashboardCards";
import { useState, useEffect } from "react";

export default function Dashboard() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const storedEmployees =
            localStorage.getItem("employees");

        if (storedEmployees) {
            setEmployees(JSON.parse(storedEmployees));
        }
    }, []);

    const activeEmployees = employees.filter((employee) => (employee.status || "Active") === "Active").length;
    const inactiveEmployees = employees.filter((employee) => (employee.status || "Active") === "Inactive").length;

    const itEmployees = employees.filter(
        (employee) => employee.department === "IT").length;

    const hrEmployees = employees.filter(
        (employee) => employee.department === "HR").length;

    const salesEmployees = employees.filter(
        (employee) => employee.department === "Sales").length;

    const financeEmployees = employees.filter((employee) => employee.department === "Finance").length;

    return (
        <MainLayout>
            <div className="row">
                <h3 className="mb-4">Employees List</h3>
                <div className="col-md-4">
                    <div className="card p-3">
                        <h6>Total Employees</h6>
                        <h3>{employees.length}</h3>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card p-3">
                        <h6>Active Employees</h6>
                        <h3>{activeEmployees}</h3>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card p-3">
                        <h6>Inactive Employees</h6>
                        <h3>{inactiveEmployees}</h3>
                    </div>
                </div>
            </div>

            <div className="column mt-4">
                <div className="col-md-3 my-2">
                    <div className="card p-3">
                        <h6>IT {itEmployees}</h6>
                    </div>
                </div>

                <div className="col-md-3 my-2">
                    <div className="card p-3">
                        <h6>HR {hrEmployees}</h6>
                    </div>
                </div>

                <div className="col-md-3 my-2">
                    <div className="card p-3">
                        <h6>Sales {salesEmployees}</h6>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card p-3">
                        <h6>Finance {financeEmployees}</h6>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}