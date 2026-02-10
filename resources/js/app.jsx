import "./bootstrap";
import "../css/app.css";

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Profile from "./Pages/Student/Profile";
import Krs from "./Pages/Student/Krs";
import Khs from "./Pages/Student/Khs";
import UserList from "./Pages/Admin/UserList";
import Faculties from "./Pages/Admin/Faculties";
import Courses from "./Pages/Admin/Courses";
import Semesters from "./Pages/Admin/Semesters";
import Classes from "./Pages/Admin/Classes";
import LecturerGrades from "./Pages/Lecturer/Grades";
import KrsApproval from "./Pages/Lecturer/KrsApproval";
import Tuition from "./Pages/Student/Tuition";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

const rootElement = document.getElementById("root");
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />

                    {/* Authenticated Routes */}
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/krs"
                        element={
                            <ProtectedRoute>
                                <Krs />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/khs"
                        element={
                            <ProtectedRoute>
                                <Khs />
                            </ProtectedRoute>
                        }
                    />

                    {/* Admin Routes */}
                    <Route
                        path="/admin/users"
                        element={
                            <ProtectedRoute>
                                <UserList />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/faculties"
                        element={
                            <ProtectedRoute>
                                <Faculties />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/courses"
                        element={
                            <ProtectedRoute>
                                <Courses />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/semesters"
                        element={
                            <ProtectedRoute>
                                <Semesters />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/classes"
                        element={
                            <ProtectedRoute>
                                <Classes />
                            </ProtectedRoute>
                        }
                    />

                    {/* Lecturer Routes */}
                    <Route
                        path="/lecturer/grades"
                        element={
                            <ProtectedRoute>
                                <LecturerGrades />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/lecturer/krs-approval"
                        element={
                            <ProtectedRoute>
                                <KrsApproval />
                            </ProtectedRoute>
                        }
                    />

                    {/* Student Extension Routes */}
                    <Route
                        path="/student/tuition"
                        element={
                            <ProtectedRoute>
                                <Tuition />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </React.StrictMode>,
    );
}
