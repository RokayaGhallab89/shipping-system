import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./models/auth/pages/Login";
import Dashboard from "./models/dashboard/pages/Dashboard";
import Users from "./models/users/pages/users";

import Branches from "./models/branches/pages/branches";
import Merchant from "./models/merchant/pages/merchant";
import { DarkModeProvider } from "./context/DarkModeContext";

export default function App() {
  return (
    <DarkModeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/branches" element={<Branches />} />
          <Route path="/merchant" element={<Merchant />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </DarkModeProvider>
  );
}
