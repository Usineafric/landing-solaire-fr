import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MentionsLegales from "./pages/MentionsLegales";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import Cookies from "./pages/Cookies";
import AdminLogin from "./pages/AdminLogin";           // ✅ NOUVEAU
import AdminDashboard from "./pages/AdminDashboard";   // ✅ NOUVEAU

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/politique-de-confidentialite" element={<PolitiqueConfidentialite />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/admin" element={<AdminLogin />} />                    {/* ✅ NOUVEAU */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />      {/* ✅ NOUVEAU */}
      </Routes>
    </BrowserRouter>
  );
}