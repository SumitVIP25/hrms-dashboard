import MainLayout from "../layout/MainLayout";
import { useState } from "react";
import "../CSS/Settings.css";

export default function Settings() {

    const userEmail = localStorage.getItem("userEmail") || "admin@hrms.com";
    localStorage.setItem("userEmail", userEmail);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handlePasswordChange = () => {

        const storedPassword = localStorage.getItem("userPassword") || "admin123";

        if (currentPassword !== storedPassword) {
            alert("Current password is incorrect");
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("New password do not match");
            return;
        }

        if (newPassword.length < 6) {
            alert("Password must be atleast 6 characters");
            return;
        }

        localStorage.setItem("userPassword", newPassword);

        alert("Password updated successfully");

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    }


    return (
        <MainLayout>
            <div className="container-fluid">
                <div>
                    <h2 className="mb-4">Settings</h2>
                    <p className="settings-subtitle">
                        Manage your profile and system preferences.
                    </p>
                </div>

                <div className="row">

                    {/* profile information */}
                    <div className="col-md-4 mb-4">
                        <div className="settings-card settings-blue">
                            <h4 className="settings-card-title">Profile Information</h4>
                            <p>
                                <strong>Name:</strong> HR Admin
                            </p>

                            <p>
                                <strong>Email:</strong> {userEmail}
                            </p>

                            <p>
                                <strong>Role:</strong> Administrator
                            </p>
                        </div>
                    </div>

                    {/*Change Password */}
                    <div className="col-md-4 mb-4">
                        <div className="settings-card settings-green">
                            <h4 className="settings-card-title">Change Password</h4>
                            <input
                                type="password"
                                className="form-control settings-input mb-3"
                                placeholder="Current Password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />

                            <input
                                type="password"
                                className="form-control settings-input mb-3"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />

                            <input
                                type="password"
                                className="form-control settings-input mb-3"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />

                            <button className="btn settings-btn w-100"
                                onClick={handlePasswordChange}>
                                Update Password
                            </button>
                        </div>
                    </div>

                    {/* System Information */}
                    <div className="col-md-4 mb-4">
                        <div className="settings-card settings-purple">
                            <h4 className="settings-card-title">System Information</h4>
                            <p>
                                <strong>HRMS Version:</strong> 1.0
                            </p>

                            <p>
                                <strong>Developer:</strong> Sumit Prashant
                            </p>

                            <p>
                                <strong>Last Updated:</strong> June-2026
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </MainLayout>
    )
}