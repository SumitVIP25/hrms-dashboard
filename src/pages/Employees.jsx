import MainLayout from "../layout/MainLayout";
import { useEffect, useState } from "react";

export default function Employees() {

    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

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
                        {employees.map((employee) => (
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