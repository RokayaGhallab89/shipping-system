import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Dashboard from "../models/dashboard/pages/Dashboard";

import Dashboard from './../models/dashboard copy/pages/dashboard';
import Users from './../models/users/pages/users';
import Branches from './../models/branches/pages/branches';
import Merchant from './../models/merchant/pages/merchant';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
 
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="branches" element={<Branches />} />
        <Route path="merchant" element={<Merchant />} />
      </Routes>
    </BrowserRouter>
  );
}
