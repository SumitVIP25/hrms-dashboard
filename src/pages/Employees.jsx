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
    const [department, setDepartment] = useState("");
    const [role, setRole] = useState("");
    const [joiningDate, setJoiningDate] = useState("");
    const [editId, setEditId] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const employeesPerPage = 5;


    const handleView = (employee) => {
        console.log(employee);
        setSelectedEmployee(employee);
    }

    const handleCancelEdit = () => {
        setName("");
        setEmail("");
        setDepartment("");
        setJoiningDate("");
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

    const indexOfLastEmployee = currentPage * employeesPerPage;

    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;

    const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

    const totalPages = Math.ceil(
        filteredEmployees.length / employeesPerPage
    );

    const fetchEmployees = () => {
        const storedEmployees = localStorage.getItem("employees");

        if (storedEmployees) {
            setEmployees(JSON.parse(storedEmployees));
        }
        setLoading(false);
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
        setDepartment(employee.department);
        setRole(employee.role);
        setJoiningDate(employee.joiningDate);
        setEditId(employee.id);
    }

    const handleAddEmployee = () => {

        if (name.trim() === "" || email.trim() === "") {
            alert("Please fill all fields");
            return;
        }

        if (department === "") {
            alert("Please select a department");
            return;
        }

        if (role === "") {
            alert("Please select a role");
            return;
        }

        if (joiningDate === "") {
            alert("Please select joining date");
            return;
        }

        const emailExists = employees.some((employee) =>
            employee.email.toLowerCase() === email.trim().toLowerCase());

        if (emailExists && editId === null) {
            alert("Email already exists");
            return;
        }

        const nameRegex = /^[A-Za-z ]+$/;
        if (!nameRegex.test(name.trim())) {
            alert("Name should contain only letters");
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
                        department,
                        role,
                        joiningDate,
                    }
                        : employee
                );

            setEmployees(updatedEmployees);
            setEditId(null);
        } else {
            const nextId = employees.length > 0 ? Math.max(...employees.map(employee => employee.id)) + 1 : 1;

            const newEmployee = {
                id: nextId,
                name: name.trim(),
                email: email.trim(),
                department,
                role,
                joiningDate,
                status: "Active",
            };
            setEmployees([...employees, newEmployee]);
        }
        setName("");
        setEmail("");
        setDepartment("");
        setRole("");
        setJoiningDate("");
    };

    return (
        <MainLayout>
            <div className="container">
                <button className="btn btn-success mt-2 mb-2" onClick={handleSort}>
                    Sort by Name
                </button>

                <div className="card p-4 mb-4">
                    <h4 className="mb-3">{editId !== null ? "Edit Employee" : "Add Employee"}</h4>

                    <div className="row g-3">
                        <div className="col-md-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="col-md-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="col-md-2">
                            <select
                                className="form-select"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                            >
                                <option value="" >Select Department</option>
                                <option value="IT">IT</option>
                                <option value="HR">HR</option>
                                <option value="Sales">Sales</option>
                                <option value="Finance">Finance</option>
                            </select>
                        </div>

                        <div className="col-md-2">
                            <select
                                className="form-select"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="">Select Role</option>
                                <option value="Developer">Developer</option>
                                <option value="Executive">Executive</option>
                                <option value="Senior Executive">Senior Executive</option>
                                <option value="Team Lead">Team Lead</option>
                                <option value="Manager">Manager</option>
                            </select>
                        </div>

                        <div className="col-md-2">
                            <input
                                type="date"
                                className="form-control"
                                value={joiningDate}
                                onChange={(e) => setJoiningDate(e.target.value)}
                            />
                        </div>

                        <div className="col-md-3">
                            <div className="d-flex gap-2">
                                <button className="btn btn-primary flex-grow-1"
                                    onClick={handleAddEmployee}>
                                    {editId !== null ? "Update" : "Add"}
                                </button>

                                {editId !== null && (
                                    <button
                                        className="btn btn-secondary"
                                        onClick={handleCancelEdit}>Cancel Edit
                                    </button>
                                )}
                            </div>
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
                            <strong>Department:</strong> {selectedEmployee.department || ""}<br />
                        </p>
                        <p>
                            <strong>Role:</strong>{selectedEmployee.role || ""}<br />
                        </p>
                        <p><strong>DOJ:</strong>{selectedEmployee.joiningDate || "-"}<br />
                        </p>
                        <p>
                            <strong>Username:</strong> {selectedEmployee.username} <br />
                        </p>
                        <button className="btn btn-secondary"
                            onClick={() => setSelectedEmployee(null)}>Close</button>
                    </div>
                )}

                <div className="card p-3">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
                            <thead>
                                <tr>
                                    <th>S.No.</th>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Department</th>
                                    <th>Role</th>
                                    <th>DOJ</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                    <th>Toggle Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredEmployees.length > 0 ? (
                                    currentEmployees.map((employee, index) => (
                                        <tr key={employee.index}>
                                            <td className="text-nowrap">{indexOfFirstEmployee + index + 1}</td>
                                            <td className="text-nowrap">{employee.id}</td>
                                            <td className="text-nowrap">{employee.name}</td>
                                            <td className="text-nowrap">{employee.email}</td>
                                            <td className="text-nowrap">{employee.department || "-"}</td>
                                            <td className="text-nowrap">{employee.role || "-"}</td>
                                            <td className="text-nowrap">{employee.joiningDate || "-"}</td>
                                            <td>
                                                <span className={`badge ${(employee.status || "Active") === "Active"
                                                    ? "bg-success"
                                                    : "bg-danger"}`}
                                                >
                                                    {employee.status || "Active"}
                                                </span>
                                            </td>

                                            <td className="text-nowrap">
                                                <button className="btn btn-info btn-sm me-2"
                                                    onClick={() => handleView(employee)}>View</button>

                                                <button className="btn btn-sm btn-warning me-2"
                                                    onClick={() => handleEdit(employee)}>Edit</button>

                                                <button className="btn btn-danger btn-sm"
                                                    onClick={() => handleDelete(employee.id)}>Delete</button>
                                            </td>

                                            <td className="text-nowrap">
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
                        <div className="d-flex justify-content-center mt-3">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index}
                                    className={`btn me-2 ${currentPage === index + 1 ? "btn-primary" : "btn-outline-primary"}`}
                                    onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>


        </MainLayout >

    );
}