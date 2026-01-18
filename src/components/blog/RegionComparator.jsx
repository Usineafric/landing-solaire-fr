import { useState } from "react";
import { MapPin, Sun, Euro, Clock, ArrowRight } from "lucide-react";

const regionsData = {
  "paca": {
    name: "PACA",
    production: 1500,
    sun: 2800,
    amortissement: 7,
    gain25: 38000,
    cities: ["Marseille", "Nice", "Toulon", "Aix-en-Provence"]
  },
  "occitanie": {
    name: "Occitanie",
    production: 1400,
    sun: 2600,
    amortissement: 7.5,
    gain25: 35000,
    cities: ["Toulouse", "Montpellier", "Nîmes", "Perpignan"]
  },
  "nouvelle-aquitaine": {
    name: "Nouvelle-Aquitaine",
    production: 1300,
    sun: 2400,
    amortissement: 8,
    gain25: 32000,
    cities: ["Bordeaux", "Limoges", "Pau", "La Rochelle"]
  },
  "auvergne-rhone-alpes": {
    name: "Auvergne-Rhône-Alpes",
    production: 1200,
    sun: 2200,
    amortissement: 8.5,
    gain25: 30000,
    cities: ["Lyon", "Grenoble", "Saint-Étienne", "Annecy"]
  },
  "ile-de-france": {
    name: "Île-de-France",
    production: 1050,
    sun: 1660,
    amortissement: 9.5,
    gain25: 27000,
    cities: ["Paris", "Versailles", "Boulogne", "Saint-Denis"]
  },
  "bretagne": {
    name: "Bretagne",
    production: 1050,
    sun: 1800,
    amortissement: 9.5,
    gain25: 26000,
    cities: ["Rennes", "Brest", "Lorient", "Saint-Malo"]
  },
  "hauts-de-france": {
    name: "Hauts-de-France",
    production: 950,
    sun: 1600,
    amortissement: 10.5,
    gain25: 23000,
    cities: ["Lille", "Amiens", "Calais", "Valenciennes"]
  }
};

export default function RegionComparator() {
  const [region1, setRegion1] = useState("paca");
  const [region2, setRegion2] = useState("ile-de-france");

  const r1 = regionsData[region1];
  const r2 = regionsData[region2];

  const maxProduction = Math.max(r1.production, r2.production);
  const maxSun = Math.max(r1.sun, r2.sun);
  const maxGain = Math.max(r1.gain25, r2.gain25);

  return (
    <div className="my-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center">
          <MapPin className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Comparateur de régions</h3>
          <p className="text-gray-600 text-sm">Comparez le potentiel solaire entre deux régions</p>
        </div>
      </div>

      {/* Sélecteurs */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Région 1</label>
          <select
            value={region1}
            onChange={(e) => setRegion1(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
          >
            {Object.entries(regionsData).map(([key, value]) => (
              <option key={key} value={key}>{value.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Région 2</label>
          <select
            value={region2}
            onChange={(e) => setRegion2(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
          >
            {Object.entries(regionsData).map(([key, value]) => (
              <option key={key} value={key}>{value.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparaison visuelle */}
      <div className="space-y-6">
        {/* Production */}
        <div>
          <div className="flex justify-between text-sm font-semibold text-gray-700 mb-2">
            <span>Production (kWh/kWc/an)</span>
            <div className="flex gap-8">
              <span className="text-blue-600">{r1.production}</span>
              <span className="text-indigo-600">{r2.production}</span>
            </div>
          </div>
          <div className="flex gap-2 h-6">
            <div
              className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${(r1.production / maxProduction) * 50}%` }}
            />
            <div
              className="bg-gradient-to-r from-indigo-400 to-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${(r2.production / maxProduction) * 50}%` }}
            />
          </div>
        </div>

        {/* Ensoleillement */}
        <div>
          <div className="flex justify-between text-sm font-semibold text-gray-700 mb-2">
            <span>Ensoleillement (h/an)</span>
            <div className="flex gap-8">
              <span className="text-blue-600">{r1.sun}</span>
              <span className="text-indigo-600">{r2.sun}</span>
            </div>
          </div>
          <div className="flex gap-2 h-6">
            <div
              className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full transition-all duration-500"
              style={{ width: `${(r1.sun / maxSun) * 50}%` }}
            />
            <div
              className="bg-gradient-to-r from-orange-400 to-red-400 rounded-full transition-all duration-500"
              style={{ width: `${(r2.sun / maxSun) * 50}%` }}
            />
          </div>
        </div>

        {/* Gain sur 25 ans */}
        <div>
          <div className="flex justify-between text-sm font-semibold text-gray-700 mb-2">
            <span>Gain estimé sur 25 ans (6 kWc)</span>
            <div className="flex gap-8">
              <span className="text-blue-600">{r1.gain25.toLocaleString()}€</span>
              <span className="text-indigo-600">{r2.gain25.toLocaleString()}€</span>
            </div>
          </div>
          <div className="flex gap-2 h-6">
            <div
              className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${(r1.gain25 / maxGain) * 50}%` }}
            />
            <div
              className="bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-500"
              style={{ width: `${(r2.gain25 / maxGain) * 50}%` }}
            />
          </div>
        </div>
      </div>

      {/* Résumé */}
      <div className="mt-6 p-4 bg-white rounded-xl">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="text-center p-3 rounded-lg bg-blue-50">
            <div className="font-bold text-blue-700">{r1.name}</div>
            <div className="text-sm text-gray-600">Amortissement: {r1.amortissement} ans</div>
            <div className="text-xs text-gray-500 mt-1">{r1.cities.join(", ")}</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-indigo-50">
            <div className="font-bold text-indigo-700">{r2.name}</div>
            <div className="text-sm text-gray-600">Amortissement: {r2.amortissement} ans</div>
            <div className="text-xs text-gray-500 mt-1">{r2.cities.join(", ")}</div>
          </div>
        </div>
        <p className="text-center text-sm text-gray-600 mt-4">
          Différence de production: <strong>{Math.abs(r1.production - r2.production)} kWh/kWc</strong>
          {" "}({Math.round(Math.abs(r1.production - r2.production) / Math.max(r1.production, r2.production) * 100)}%)
        </p>
      </div>
    </div>
  );
}
