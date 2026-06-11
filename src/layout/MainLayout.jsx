import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { NavLink } from "react-router-dom";


export default function MainLayout({ children }) {

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1 bg-light">
                <Navbar />
                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    );
}