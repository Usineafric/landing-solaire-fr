import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToHash from "./components/ScrollToHash";  // 🆕 AJOUTER
import HomePage from "./pages/HomePage";
import MentionsLegales from "./pages/MentionsLegales";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import Cookies from "./pages/Cookies";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Garanties from "./pages/Garanties";
import Processus from "./pages/Processus";
import Realisations from "./pages/Realisations";
import Simulateur from "./pages/Simulateur";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />  {/* 🆕 AJOUTER ICI */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/politique-de-confidentialite" element={<PolitiqueConfidentialite />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/garanties" element={<Garanties />} />
        <Route path="/processus" element={<Processus />} />
        <Route path="/realisations" element={<Realisations />} />
        <Route path="/simulateur" element={<Simulateur />} />
      </Routes>
    </BrowserRouter>
  );
}