import { useState } from "react";
import { Calculator, TrendingDown, Zap, Euro, Calendar, Sun, ArrowRight } from "lucide-react";

export default function SavingsCalculator() {
  const [monthlyBill, setMonthlyBill] = useState(150);
  const [postalCode, setPostalCode] = useState("");
  const [roofArea, setRoofArea] = useState(30);
  const [showResults, setShowResults] = useState(false);

  // Calculs (formules simplifiées basées sur moyennes secteur)
  const annualConsumption = monthlyBill * 12;
  const kWhPrice = 0.25; // Prix moyen kWh en France
  const annualKWh = annualConsumption / kWhPrice;
  
  // Ensoleillement moyen par région (heures équivalentes plein soleil)
  const getSunHours = (postal) => {
    if (!postal) return 1200;
    const dept = postal.substring(0, 2);
    // Sud: 1400h, Centre: 1200h, Nord: 1000h
    if (['13', '83', '06', '04', '05', '84'].includes(dept)) return 1400;
    if (['69', '38', '73', '74', '01'].includes(dept)) return 1300;
    if (['59', '62', '80', '02'].includes(dept)) return 1000;
    return 1200; // Moyenne
  };

  const sunHours = getSunHours(postalCode);
  
  // Puissance recommandée (kWc)
  const recommendedPower = Math.min(Math.ceil(annualKWh / sunHours / 1000) * 1000 / 1000, roofArea / 6);
  
  // Production annuelle estimée (kWh)
  const annualProduction = recommendedPower * sunHours * 0.85; // 0.85 = rendement système
  
  // Taux d'autoconsommation estimé
  const selfConsumptionRate = 0.70; // 70% autoconsommé en moyenne
  const selfConsumedKWh = annualProduction * selfConsumptionRate;
  
  // Économies annuelles
  const annualSavings = Math.round(selfConsumedKWh * kWhPrice);
  const reductionPercent = Math.round((selfConsumedKWh / annualKWh) * 100);
  
  // Coût installation (€)
  const installationCost = recommendedPower * 2000; // ~2000€/kWc
  
  // Aides (Ma Prime Rénov + Prime autoconso)
  const calculateAids = () => {
    if (recommendedPower <= 3) return 1500;
    if (recommendedPower <= 6) return 2500;
    if (recommendedPower <= 9) return 3500;
    return 4500;
  };
  const totalAids = calculateAids();
  
  // Coût net après aides
  const netCost = installationCost - totalAids;
  
  // ROI (années)
  const roi = Math.round((netCost / annualSavings) * 10) / 10;

  const calculate = () => {
    if (monthlyBill > 0 && roofArea > 0) {
      setShowResults(true);
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-page">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Calculator className="inline w-4 h-4 mr-1" />
            Simulation Gratuite
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Calculez vos
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 mt-2">
              économies potentielles
            </span>
          </h2>

          <p className="text-lg text-gray-600 font-light">
            Estimez gratuitement le retour sur investissement de votre installation solaire 
            en moins de 2 minutes.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            
            {/* Calculator Form */}
            <div className="bg-white rounded-3xl border-2 border-gray-200 p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-white" />
                </div>
                Vos informations
              </h3>

              <div className="space-y-6">
                
                {/* Monthly Bill */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Facture d'électricité mensuelle
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      min="50"
                      max="500"
                      step="10"
                      value={monthlyBill}
                      onChange={(e) => setMonthlyBill(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                      <span>50€</span>
                      <span className="font-semibold text-orange-600 text-lg">{monthlyBill}€/mois</span>
                      <span>500€</span>
                    </div>
                  </div>
                </div>

                {/* Postal Code */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Code postal
                  </label>
                  <div className="relative">
                    <Sun className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="75001"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      maxLength="5"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors font-light"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1 font-light">
                    Pour calculer l'ensoleillement de votre région
                  </p>
                </div>

                {/* Roof Area */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Surface de toiture disponible (m²)
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      min="15"
                      max="100"
                      step="5"
                      value={roofArea}
                      onChange={(e) => setRoofArea(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                      <span>15 m²</span>
                      <span className="font-semibold text-orange-600 text-lg">{roofArea} m²</span>
                      <span>100 m²</span>
                    </div>
                  </div>
                </div>

                {/* Calculate Button */}
                <button
                  onClick={calculate}
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <Calculator className="w-5 h-5" />
                  Calculer mes économies
                </button>

                <p className="text-xs text-center text-gray-500 font-light">
                  💡 Simulation basée sur les données moyennes du marché français
                </p>
              </div>
            </div>

            {/* Results */}
            <div className={`transition-all duration-500 ${showResults ? 'opacity-100' : 'opacity-50'}`}>
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white shadow-2xl">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Zap className="w-8 h-8 text-yellow-400" />
                  Vos résultats
                </h3>

                <div className="space-y-4 mb-8">
                  
                  {/* Recommended Power */}
                  <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300 font-light">Puissance recommandée</span>
                      <Zap className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div className="text-4xl font-bold text-yellow-400">{recommendedPower.toFixed(1)} kWc</div>
                    <div className="text-sm text-gray-400 mt-1">~{Math.round(recommendedPower / 0.4)} panneaux</div>
                  </div>

                  {/* Annual Savings */}
                  <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300 font-light">Économies annuelles</span>
                      <TrendingDown className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="text-4xl font-bold text-green-400">{annualSavings}€</div>
                    <div className="text-sm text-gray-400 mt-1">Soit -{reductionPercent}% sur vos factures</div>
                  </div>

                  {/* ROI */}
                  <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300 font-light">Retour sur investissement</span>
                      <Calendar className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="text-4xl font-bold text-blue-400">{roi} ans</div>
                    <div className="text-sm text-gray-400 mt-1">Rentabilité garantie 25+ ans</div>
                  </div>

                  {/* Aids */}
                  <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur rounded-2xl p-6 border border-green-400/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-200 font-light">Aides disponibles</span>
                      <Euro className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="text-4xl font-bold text-green-400">{totalAids.toLocaleString()}€</div>
                    <div className="text-sm text-gray-300 mt-1">Prime autoconsommation + MaPrimeRénov'</div>
                  </div>
                </div>

                {/* Investment Summary */}
                <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl p-6 border border-yellow-400/30 mb-6">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Coût installation</span>
                      <span className="font-semibold">{installationCost.toLocaleString()}€</span>
                    </div>
                    <div className="flex justify-between text-green-400">
                      <span>Aides déduites</span>
                      <span className="font-semibold">-{totalAids.toLocaleString()}€</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-white/20 text-lg font-bold">
                      <span>Coût net</span>
                      <span className="text-yellow-400">{netCost.toLocaleString()}€</span>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  Obtenir mon étude personnalisée
                  <ArrowRight className="w-5 h-5" />
                </button>

                <p className="text-xs text-center text-gray-400 font-light mt-4">
                  📞 Un conseiller vous recontacte sous 48h
                </p>
              </div>
            </div>
          </div>

          {/* Info Banner */}
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-8 text-center">
            <h4 className="text-xl font-bold text-gray-900 mb-3">
              💡 Ces chiffres sont des estimations
            </h4>
            <p className="text-gray-700 font-light max-w-3xl mx-auto">
              Les résultats sont calculés sur la base de moyennes nationales. 
              Pour une étude précise prenant en compte l'orientation exacte de votre toiture, 
              les ombrages et votre profil de consommation, demandez une étude personnalisée gratuite.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}