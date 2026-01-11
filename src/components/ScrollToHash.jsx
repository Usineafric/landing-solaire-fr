import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    // Si l'URL contient un hash (ex: /#form)
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        // Scroll vers l'élément avec un délai pour laisser la page charger
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    } else {
      // Sinon scroll en haut de la page
      window.scrollTo(0, 0);
    }
  }, [location]);

  return null; // Ce composant ne rend rien visuellement
}