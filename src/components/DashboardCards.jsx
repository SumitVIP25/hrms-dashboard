export default function DashboardCard({ title, count }) {
    return (
        <div className="col-md-3">
            <div className="card shadow-sm p-3">
                <h6 className="text-muted">{title}</h6>
                <h3>{count}</h3>
            </div>
        </div>
    );
}