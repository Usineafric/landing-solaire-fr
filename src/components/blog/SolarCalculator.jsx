import { useState } from "react";
import { Calculator, Sun, Euro, TrendingUp, Zap } from "lucide-react";

export default function SolarCalculator() {
  const [power, setPower] = useState(6);
  const [region, setRegion] = useState("auvergne-rhone-alpes");
  const [consumption, setConsumption] = useState(70);
  const [showResults, setShowResults] = useState(false);

  const regions = {
    "paca": { name: "PACA", production: 1500, sun: 2800 },
    "occitanie": { name: "Occitanie", production: 1400, sun: 2600 },
    "nouvelle-aquitaine": { name: "Nouvelle-Aquitaine", production: 1300, sun: 2400 },
    "auvergne-rhone-alpes": { name: "Auvergne-Rhône-Alpes", production: 1200, sun: 2200 },
    "centre-val-loire": { name: "Centre-Val de Loire", production: 1150, sun: 1900 },
    "ile-de-france": { name: "Île-de-France", production: 1050, sun: 1660 },
    "grand-est": { name: "Grand Est", production: 1050, sun: 1750 },
    "bretagne": { name: "Bretagne", production: 1050, sun: 1800 },
    "normandie": { name: "Normandie", production: 1000, sun: 1700 },
    "hauts-de-france": { name: "Hauts-de-France", production: 950, sun: 1600 }
  };

  const calculate = () => {
    setShowResults(true);
  };

  const selectedRegion = regions[region];
  const annualProduction = power * selectedRegion.production;
  const selfConsumed = annualProduction * (consumption / 100);
  const surplus = annualProduction - selfConsumed;

  const electricityPrice = 0.25;
  const surplusPrice = 0.13;

  const savingsFromSelfConsumption = selfConsumed * electricityPrice;
  const revenueFromSurplus = surplus * surplusPrice;
  const totalAnnualBenefit = savingsFromSelfConsumption + revenueFromSurplus;

  const installationCost = power * 2200;
  const primeAutoconso = power <= 3 ? 1140 : power <= 9 ? 1680 : 2340;
  const netCost = installationCost - primeAutoconso;

  const paybackYears = netCost / totalAnnualBenefit;
  const gain25Years = (totalAnnualBenefit * 25) - netCost;

  return (
    <div className="my-8 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
          <Calculator className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Calculateur d'économies solaires</h3>
          <p className="text-gray-600 text-sm">Estimez vos économies en 30 secondes</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        {/* Puissance */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Puissance souhaitée
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="3"
              max="12"
              step="1"
              value={power}
              onChange={(e) => setPower(Number(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
            <span className="w-16 text-center font-bold text-orange-600">{power} kWc</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">{Math.round(power * 2.5)} m² de toiture</p>
        </div>

        {/* Région */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Votre région
          </label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            {Object.entries(regions).map(([key, value]) => (
              <option key={key} value={key}>{value.name}</option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">{selectedRegion.sun}h de soleil/an</p>
        </div>

        {/* Autoconsommation */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Taux d'autoconsommation
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="30"
              max="90"
              step="10"
              value={consumption}
              onChange={(e) => setConsumption(Number(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
            <span className="w-16 text-center font-bold text-orange-600">{consumption}%</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">30-50% sans batterie, 70-90% avec</p>
        </div>
      </div>

      <button
        onClick={calculate}
        className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-xl hover:shadow-lg transition-all"
      >
        Calculer mes économies
      </button>

      {showResults && (
        <div className="mt-6 pt-6 border-t border-orange-200">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <Sun className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{annualProduction.toLocaleString()}</div>
              <div className="text-sm text-gray-600">kWh/an produits</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <Euro className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">{Math.round(totalAnnualBenefit).toLocaleString()}€</div>
              <div className="text-sm text-gray-600">économies/an</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <TrendingUp className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{paybackYears.toFixed(1)} ans</div>
              <div className="text-sm text-gray-600">amortissement</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <Zap className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600">+{Math.round(gain25Years).toLocaleString()}€</div>
              <div className="text-sm text-gray-600">gain sur 25 ans</div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center">
            * Estimation basée sur un prix d'électricité de 0,25€/kWh et un tarif de rachat de 0,13€/kWh.
            Coût estimé: {netCost.toLocaleString()}€ après prime autoconsommation.
          </p>
        </div>
      )}
    </div>
  );
}
