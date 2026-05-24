import MainLayout from "../layout/MainLayout";

export default function Employees() {
    const employees = [
        {
            id: 1,
            name: "Rahul Sharma",
            email: "rahul@test.com",
            department: "HR",
        },
        {
            id: 2,
            name: "Amit Kumar",
            email: "amit@test.com",
            department: "IT"
        },
        {
            id: 3,
            name: "Priya Singh",
            email: "priya@test.com",
            department: "Finance",
        },
    ];
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