import { ArrowRight } from "lucide-react";

export default function StickyCta() {
  const goForm = () => {
    const el = document.getElementById("form");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="bg-white/90 backdrop-blur border-t border-gray-200">
        <div className="container-page py-3 flex items-center gap-3">
          <div className="flex-1">
            <div className="text-sm font-semibold text-gray-900">
              Étude solaire maison
            </div>
            <div className="text-xs text-gray-500">
              ~2 min • Sans engagement
            </div>
          </div>

          <button onClick={goForm} className="btn-primary px-5 py-3">
            Demander
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
