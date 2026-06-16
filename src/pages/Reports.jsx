import MainLayout from "../layout/MainLayout";
import { useMemo } from "react";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

import { Pie, Doughnut } from "react-chartjs-2";
import ChartdataLabels from "chartjs-plugin-datalabels";
import "../CSS/Reports.css";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    ChartdataLabels
)

export default function Reports() {

    const employees = useMemo(() => {
        return JSON.parse(localStorage.getItem("employees")) || [];
    }, []);

    const payrolls = useMemo(() => {
        return JSON.parse(localStorage.getItem("payrolls")) || [];
    }, []);

    const leaves = useMemo(() => {
        return JSON.parse(localStorage.getItem("leaveRequests")) || [];
    }, []);

    const totalEmployees = employees.length;

    const activeEmployees = useMemo(() =>
        employees.filter(emp => (emp.status || "Active") === "Active").length, [employees]);


    const inactiveEmployees = useMemo(() =>
        employees.filter(emp => emp.status === "Inactive").length, [employees]);


    const totalPayrolls = payrolls.length;

    const totalLeaves = leaves.length;

    const departmentCounts = {
        IT: 0,
        HR: 0,
        Sales: 0,
        Finance: 0,
    };

    employees.forEach(emp => {
        if (departmentCounts[emp.department] !== undefined) {
            departmentCounts[emp.department]++;
        }
    });

    const departmentData = useMemo(() => ({
        labels: ["IT", "HR", "Sales", "Finance"],
        datasets: [{
            label: "Employees",
            data: [
                departmentCounts.IT,
                departmentCounts.HR,
                departmentCounts.Sales,
                departmentCounts.Finance,
            ],
            backgroundColor: [
                "#36A2EB",
                "#FF6384",
                "#FFCE56",
                "#4BC0C0",
            ],
            borderWidth: 1,
        }],
    }), [employees]);

    const statusData = useMemo(() => ({
        labels: ["Active", "Inactive"],
        datasets: [
            {
                label: "Employees",
                data: [
                    activeEmployees,
                    inactiveEmployees,
                ],
                backgroundColor: [
                    "#36A2EB",
                    "#FF6384",
                    "#FFCE56",
                    "#4BC0C0",
                ],
                borderWidth: 1,
            }],
    }), [activeEmployees, inactiveEmployees]);

    const pieOptions = useMemo(() => ({
        plugins: {
            datalabels: {
                color: "#fff",
                formatter: (value, context) => {
                    const data = context.dataset.data;
                    const total = data.reduce((a, b) => a + b, 0);

                    const percentage = ((value / total) * 100).toFixed(1);
                    return percentage + "%";
                },
            },
        },
    }), []);

    return (
        <MainLayout>
            <div className="container-fluid">
                <div className="mb-4">
                    <h2 className="reports-title">Reports Dashboard</h2>
                    <p className="reports-subtitle">Insights and analytics of your HRMS data.</p>
                </div>

                {/*Summary cards*/}
                <div className="row g-3 mb-4">
                    <div className="col-6 col-md-2">
                        <div className="report-card report-blue">
                            <h6>Total Employees</h6>
                            <h3>{totalEmployees}</h3>
                        </div>
                    </div>


                    <div className="col-6 col-md-2">
                        <div className="report-card report-green">
                            <h6>Active</h6>
                            <h3>{activeEmployees}</h3>
                        </div>
                    </div>

                    <div className="col-6 col-md-2">
                        <div className="report-card report-red">
                            <h6>Inactive</h6>
                            <h3>{inactiveEmployees}</h3>
                        </div>
                    </div>

                    <div className="col-6 col-md-3">
                        <div className="report-card report-purple">
                            <h6>Payroll Records</h6>
                            <h3>{totalPayrolls}</h3>
                        </div>
                    </div>

                    <div className="col-6 col-md-3">
                        <div className="report-card report-yellow">
                            <h6>Leave Requests</h6>
                            <h3>{totalLeaves}</h3>
                        </div>
                    </div>
                </div>

                {/* Charts */}
                <div className="row">
                    <div className="col-12 col-md-6 mb-4">
                        <div className="chart-card">
                            <h5 className="chart-title">Employees by Department</h5>
                            <div className="chart-container">
                                <Pie data={departmentData}
                                    options={{
                                        ...pieOptions,
                                        maintainAspectRatio: false,
                                    }} />
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-6 mb-4">
                        <div className="chart-card">
                            <h5 className="chart-title">Employee Status</h5>
                            <div className="chart-container">
                                <Doughnut data={statusData}
                                    options={{
                                        ...pieOptions,
                                        maintainAspectRatio: false,
                                    }} />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </MainLayout>
    )
}