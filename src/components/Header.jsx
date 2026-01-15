import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Garanties", href: "/garanties" },
    { name: "Processus", href: "/processus" },
    { name: "Réalisations", href: "/realisations" },
    { name: "Simulateur", href: "/simulateur" }
  ];

  const isActive = (href) => location.pathname === href;

  const scrollToForm = () => {
    if (location.pathname !== "/") {
      window.location.href = "/#form";
    } else {
      document.getElementById("form")?.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <nav className="container-page py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo + Texte */}
<Link to="/" className="flex items-center gap-3 group">
  <img 
    src="/logo.png" 
    alt="Le Panneau Solaire" 
    className="h-24 w-auto group-hover:scale-105 transition-transform duration-200"
  />
  
  {/* Texte 2 lignes sur mobile */}
  <div className="flex flex-col sm:hidden">
    <span className="text-base font-bold text-gray-900 leading-tight">
      Le Panneau
    </span>
    <span className="text-base font-bold leading-tight" style={{ color: '#e64905' }}>
      Solaire
    </span>
  </div>
  
  {/* Texte 1 ligne sur desktop */}
  <div className="hidden sm:block">
    <span className="text-xl font-bold text-gray-900">Le Panneau </span>
    <span className="text-xl font-bold" style={{ color: '#e64905' }}>Solaire</span>
  </div>
</Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-semibold transition-colors hover:text-orange-600 ${
                  isActive(item.href)
                    ? "text-orange-600"
                    : "text-gray-700"
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* CTA Desktop */}
            <button
              onClick={scrollToForm}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <Phone className="w-4 h-4" />
              Étude gratuite
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-900" />
            ) : (
              <Menu className="w-6 h-6 text-gray-900" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4 space-y-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl font-semibold transition-colors ${
                  isActive(item.href)
                    ? "bg-orange-50 text-orange-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* CTA Mobile */}
            <button
              onClick={scrollToForm}
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-4 rounded-xl font-semibold shadow-lg"
            >
              <Phone className="w-5 h-5" />
              Étude gratuite
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}