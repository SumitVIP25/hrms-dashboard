import MainLayout from "../layout/MainLayout";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
} from "chart.js";

import { Pie, Doughnut } from "react-chartjs-2";
import { TbBackground } from "react-icons/tb";
import ChartdataLabels from "chartjs-plugin-datalabels";
import { color } from "chart.js/helpers";
import "../CSS/Reports.css";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    ChartdataLabels
)

export default function Reports() {

    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const payrolls = JSON.parse(localStorage.getItem("payrolls")) || [];
    const leaves = JSON.parse(localStorage.getItem("leaveRequests")) || [];

    const totalEmployees = employees.length;

    const activeEmployees = employees.filter(emp => (emp.status || "Active") === "Active").length;

    const inactiveEmployees = employees.filter(emp => emp.status === "Inactive").length;

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

    const departmentData = {
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
    };

    const statusData = {
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
    };

    const pieOptions = {
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
    };

    return (
        <MainLayout>
            <div className="container-fluid">
                <div className="mb-4">
                    <h2 className="reports-title">Reports Dashboard</h2>
                    <p className="reports-subtitles">Insights and analytics of your HRMS data.</p>
                </div>

                {/*Summary cards*/}
                <div className="row mb-4">
                    <div className="col-md-2">
                        <div className="report-card report-blue">
                            <h6>Total Employees</h6>
                            <h3>{totalEmployees}</h3>
                        </div>
                    </div>


                    <div className="col-md-2">
                        <div className="report-card report-green">
                            <h6>Active</h6>
                            <h3>{activeEmployees}</h3>
                        </div>
                    </div>

                    <div className="col-md-2">
                        <div className="report-card report-red">
                            <h6>Inactive</h6>
                            <h3>{inactiveEmployees}</h3>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="report-card report-purple">
                            <h6>Payroll Records</h6>
                            <h3>{totalPayrolls}</h3>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="report-card report-yellow">
                            <h6>Leave Requests</h6>
                            <h3>{totalLeaves}</h3>
                        </div>
                    </div>
                </div>

                {/* Charts */}
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <div className="chart-card">
                            <h5 className="chart-title">Employees by Department</h5>
                            <div style={{ height: "300px" }}>
                                <Pie data={departmentData} options={pieOptions} />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 mb-4">
                        <div className="card p-4 shadow-sm">
                            <h5 className="mb-3">Employee Status</h5>
                            <div style={{ height: "300px" }}>
                                <Doughnut data={statusData} options={pieOptions} />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </MainLayout>
    )
}