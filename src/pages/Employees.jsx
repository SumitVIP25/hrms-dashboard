import { all } from "axios";
import MainLayout from "../layout/MainLayout";
import { useEffect, useState } from "react";

export default function Employees() {

    const [employees, setEmployees] = useState(() => {
        const storedEmployees = localStorage.getItem("employees");
        return storedEmployees ? JSON.parse(storedEmployees) : [];
    });
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [editId, setEditId] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const handleView = (employee) => {
        console.log(employee);
        setSelectedEmployee(employee);
    }

    const handleCancelEdit = () => {
        setName("");
        setEmail("");
        setEditId(null);
    }

    const handleSort = () => {
        const sortedEmployees = [...employees].sort((a, b) => a.name.localeCompare(b.name));
        setEmployees(sortedEmployees);
    }

    const handleToggleStatus = (id) => {
        const updatedEmployees = employees.map((employee) =>
            employee.id === id ? {
                ...employee,
                status: employee.status === "Active" ? "Inactive" : "Active",
            } : employee
        );
        setEmployees(updatedEmployees);
    }

    const handleDelete = (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this employee?");
        if (!isConfirmed) {
            return;
        }
        const updatedEmployees = employees.filter((employee) => employee.id !== id);
        setEmployees(updatedEmployees);
    }

    const filteredEmployees = employees.filter((employee) => {
        const matchesSearch =
            employee.name
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesStatus =
            statusFilter === "All" ||
            (employee.status || "Active") === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const fetchEmployees = async () => {
        const storedEmployees = localStorage.getItem("employees");

        if (storedEmployees) {
            setEmployees(JSON.parse(storedEmployees));
            setLoading(false);
            return;
        }
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            const data = await response.json();
            const employeesWithStatus = data.map((employee) => ({
                ...employee,
                status: "Active",
            }));
            setEmployees(employeesWithStatus);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    useEffect(() => {
        localStorage.setItem("employees", JSON.stringify(employees));
    }, [employees]);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    const handleEdit = (employee) => {
        setName(employee.name);
        setEmail(employee.email);
        setEditId(employee.id);
    }

    const handleAddEmployee = () => {

        if (name.trim() === "" || email.trim() === "") {
            alert("Please fill all fields");
            return;
        }

        if (!email.includes("@") || !email.includes(".")) {
            alert("Please enter a valid email");
            return;
        }

        if (!isNaN(name)) {
            alert("Name cannot be a number");
            return;
        }

        if (name.trim().length < 3) {
            alert("Name must be at least 3 characters long");
            return;
        }

        if (editId !== null) {
            const updatedEmployees =
                employees.map((employee) =>
                    employee.id === editId ? {
                        ...employee,
                        name: name,
                        email: email,
                    }
                        : employee
                );

            setEmployees(updatedEmployees);
            setEditId(null);
        } else {
            const newEmployee = {
                id: employees.length + 1,
                name: name.trim(),
                email: email.trim(),
                status: "Active",
            };
            setEmployees([...employees, newEmployee]);
        }
        setName("");
        setEmail("");
    };

    const activeEmployees = employees.filter((employee) => (employee.status || "Active") === "Active").length;

    const inactiveEmployees = employees.filter((employee) => (employee.status || "Active") === "Inactive").length;

    return (
        <MainLayout>
            <div className="container">
                <h3 className="mb-4">Employees List</h3>

                <div className="row mb-3">

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

                <button className="btn btn-success mt-2 mb-2" onClick={handleSort}>
                    Sort by Name
                </button>

                <div className="card p-4 mb-4">
                    <h4 className="mb-3">Add Employee</h4>

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
                            <button className="btn btn-primary w-100"
                                onClick={handleAddEmployee}>
                                {editId !== null ? "Update" : "Add"}
                            </button>

                            {editId !== null && (
                                <button
                                    className="btn btn-secondary w-100 mt-2"
                                    onClick={handleCancelEdit}>Cancel Edit
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="card p-4 mb-4">
                    <h4 className="mb-3">Search Employees</h4>

                    <div className="row g-3">
                        <div className="col-md-6">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search employee..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <div className="col-md-3">
                            <select className="form-select"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}>
                                <option value="All">All</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <button className="btn btn-success w-100"
                                onClick={handleSort}>Sort By Name</button>
                        </div>

                    </div>
                </div>

                {selectedEmployee && (
                    <div className="card p-4 mb-4 shadow">
                        <h4 className="mb-3">Employee Details</h4>
                        <p>
                            <strong>ID:</strong> {selectedEmployee.id} <br />
                        </p>
                        <p>
                            <strong>Name:</strong> {selectedEmployee.name} <br />
                        </p>
                        <p>
                            <strong>Email:</strong> {selectedEmployee.email} <br />
                        </p>
                        <p>
                            <strong>Username:</strong> {selectedEmployee.username} <br />
                        </p>
                        <button className="btn btn-secondary"
                            onClick={() => setSelectedEmployee(null)}>Close</button>
                    </div>
                )}

                <div className="card p-3">
                    <table className="table table-hover align-middle">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Action</th>
                                <th>Toggle Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEmployees.length > 0 ? (
                                filteredEmployees.map((employee) => (
                                    <tr key={employee.id}>
                                        <td>{employee.id}</td>
                                        <td>{employee.name}</td>
                                        <td>{employee.email}</td>
                                        <td>
                                            <span className={`badge ${(employee.status || "Active") === "Active"
                                                ? "bg-success"
                                                : "bg-danger"}`}
                                            >
                                                {employee.status || "Active"}
                                            </span>
                                        </td>

                                        <td>
                                            <button className="btn btn-info btn-sm me-2"
                                                onClick={() => handleView(employee)}>View</button>

                                            <button className="btn btn-sm btn-warning me-2"
                                                onClick={() => handleEdit(employee)}>Edit</button>

                                            <button className="btn btn-danger btn-sm"
                                                onClick={() => handleDelete(employee.id)}>Delete</button>
                                        </td>

                                        <td>
                                            <button className="btn btn-primary btn-sm"
                                                onClick={() => handleToggleStatus(employee.id)}>
                                                Toggle Status
                                            </button>
                                        </td>
                                    </tr>
                                ))) : (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="text-center text-muted">No employees found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>


        </MainLayout >

    );
}