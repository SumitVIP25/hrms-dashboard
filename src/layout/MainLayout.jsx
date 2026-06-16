import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "../CSS/Mainlayout.css";

export default function MainLayout({ children }) {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Close sidebar automatically when screen becomes desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setSidebarOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="d-flex">

            {/* Sidebar */}
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <div
                className="flex-grow-1 bg-light"
                style={{
                    minWidth: 0,
                    width: "100%",
                    minHeight: "100vh"
                }}
            >
                <Navbar
                    setSidebarOpen={setSidebarOpen}
                />

                <div className="main-content p-3 p-md-4">
                    {children}
                </div>
            </div>

        </div>
    );
}