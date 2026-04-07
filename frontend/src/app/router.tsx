import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../shared/hooks/ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";

import Login from "../features/auth/Login";
import Dashboard from "../features/dashboard/Dashboard";
import Records from "../features/records/Records";
import Users from "../features/users/Users";
import Register from "../features/auth/Register";
import App from "../App";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<App />} />


        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/records"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Records /> 
              </DashboardLayout>
            </ProtectedRoute>
          }
        /> 

         <Route
          path="/users"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Users />
              </DashboardLayout>
            </ProtectedRoute>
          }
         />
      </Routes>
    </BrowserRouter>
  );
}