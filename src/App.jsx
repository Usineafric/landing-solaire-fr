import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToHash from "./components/ScrollToHash";
import ErrorBoundary from "./components/ErrorBoundary";
import HomePage from "./pages/HomePage";

// Code-splitting : chargement différé des pages secondaires
const MentionsLegales = lazy(() => import("./pages/MentionsLegales"));
const PolitiqueConfidentialite = lazy(() => import("./pages/PolitiqueConfidentialite"));
const Cookies = lazy(() => import("./pages/Cookies"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const Garanties = lazy(() => import("./pages/Garanties"));
const Processus = lazy(() => import("./pages/Processus"));
const Realisations = lazy(() => import("./pages/Realisations"));
const Simulateur = lazy(() => import("./pages/Simulateur"));
const BlogIndex = lazy(() => import("./pages/BlogIndex"));
const BlogPost = lazy(() => import("./pages/BlogPost"));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600 font-light">Chargement...</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollToHash />
        <Suspense fallback={<PageLoader />}>
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
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
