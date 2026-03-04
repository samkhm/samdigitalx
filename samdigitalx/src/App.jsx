import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Main from "./pages/portfolio/Main";
import Testimonials from "./components/Testimonials";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import RoleDashboard from "./pages/RoleDashboard";
import Auth from "./pages/auth_pages/Auth";
import { Toaster } from 'sonner'

export default function App() {
  return (
    <BrowserRouter>
    <Toaster richColors position='top-center' />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/" element={<Navigate to="/" />} />
        <Route path="/register" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/testimonies" element={<Testimonials />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <RoleDashboard />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
