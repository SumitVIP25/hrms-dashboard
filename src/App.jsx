import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Employees = lazy(() => import("./pages/Employees"));
const Attendance = lazy(() => import("./pages/Attendance"));
const Leave = lazy(() => import("./pages/Leave"));
const Payroll = lazy(() => import("./pages/Payroll"));
const Reports = lazy(() => import("./pages/Reports"));
const Settings = lazy(() => import("./pages/Settings"));

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return isLoggedIn ? children : <Navigate to="/" />;
}

function App() {

  return (
    <HashRouter>
      <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path='/employees' element={<ProtectedRoute><Employees /></ProtectedRoute>} />
          <Route path='/attendance' element={<ProtectedRoute><Attendance /></ProtectedRoute>} />
          <Route path='/leave' element={<ProtectedRoute><Leave /></ProtectedRoute>} />
          <Route path='/payroll' element={<ProtectedRoute><Payroll /></ProtectedRoute>} />
          <Route path='/reports' element={<ProtectedRoute><Reports /></ProtectedRoute>} />
          <Route path='/settings' element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

export default App
