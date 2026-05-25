import MainLayout from "../layout/MainLayout";
import { useEffect, useState } from "react";

export default function Employees() {

    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");


    const handelDelete = (id) => {
        const updatedEmployees = employees.filter((employee) => employee.id !== id);
        setEmployees(updatedEmployees);
    }

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

    const handleAddEmployee = () => {

        if (name.trim() === "" || email.trim() === "") {
            alert("Please fill all fields");
            return;
        }

        const newEmployee = {
            id: employees.length + 1,
            name: name,
            email: email,
        };
        setEmployees([...employees, newEmployee]);
        setName("");
        setEmail("");
    }

    return (
        <MainLayout>
            <div>
                <h3 className="mb-4">Employees List</h3>

                <div className="card p-3 mb-4">
                    <h4>Add Employee</h4>
                    <div className="row g-3">
                        <div className="col-md-5">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="col-md-5">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-primary w-100" onClick={handleAddEmployee}>Add</button>
                        </div>
                    </div>
                </div>

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
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td><button className="btn btn-danger btn-sm" onClick={() => handelDelete(employee.id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


        </MainLayout>

    );
}