import MainLayout from "../layout/MainLayout";
import DashboardCard from "../components/dashboardCards";
import { useState, useEffect } from "react";
import "../CSS/Dashboard.css"

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
            <div className="mb-4">
                <h3 className="dashboard-section-title">Dashboard Overview</h3>
            </div>
            <div className="row">
                <div className="col-md-4 mb-3">
                    <div className="dashboard-card card-blue">
                        <h6 className="dashboard-title">Total Employees</h6>
                        <h3 className="dashboard-number">{employees.length}</h3>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="dashboard-card card-green">
                        <h6 className="dashboard-title">Active Employees</h6>
                        <h3 className="dashboard-number">{activeEmployees}</h3>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="dashboard-card card-red">
                        <h6 className="dashboard-title">Inactive Employees</h6>
                        <h3 className="dashboard-number">{inactiveEmployees}</h3>
                    </div>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-md-3 mb-3">
                    <div className="dashboard-card card-purple h-100">
                        <h6 className="dashboard-title">IT Department</h6>
                        <h3 className="dashboard-number">{itEmployees}</h3>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="dashboard-card card-pink h-100">
                        <h6 className="dashboard-title">HR Department</h6>
                        <h3 className="dashboard-number">{hrEmployees}</h3>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="dashboard-card card-yellow h-100">
                        <h6 className="dashboard-title">Sales Department</h6>
                        <h3 className="dashboard-number">{salesEmployees}</h3>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="dashboard-card card-teal h-100">
                        <h6 className="dashboard-title">Finance Department</h6>
                        <h3 className="dashboard-number">{financeEmployees}</h3>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}