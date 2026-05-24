import MainLayout from "../layout/MainLayout";
import DashboardCard from "../components/dashboardCards";

export default function Dashboard() {
    return (
        <MainLayout>
            <h2>Welcome to the Dashboard</h2>
            <div className="row g-4">
                <DashboardCard
                    title="Total Employees"
                    count="120" />

                <DashboardCard
                    title="Present Today"
                    count="95" />

                <DashboardCard
                    title="On Leave"
                    count="8" />

                <DashboardCard
                    title="Departments"
                    count="5"
                />
            </div>
        </MainLayout>
    );
}