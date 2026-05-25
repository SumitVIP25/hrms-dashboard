import MainLayout from "../layout/MainLayout";
import { useEffect, useState } from "react";

export default function Employees() {

    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const filteredEmployees = employees.filter((employee) => employee.name.toLowerCase().includes(search.toLowerCase()));

    const fetchEmployees = async () => {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            const data = await response.json();
            setEmployees(data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <MainLayout>
            <div>
                <h3 className="mb-4">Employees List</h3>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search employee..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Department</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.department}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


        </MainLayout>

    );
}