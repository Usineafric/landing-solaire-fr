import { useState } from "react";
import { Calculator, TrendingDown, Sun, Home, Zap, Euro, ArrowRight, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function SavingsCalculator() {
  const [monthlyBill, setMonthlyBill] = useState(150);
  const [postalCode, setPostalCode] = useState("");
  const [roofArea, setRoofArea] = useState(30);
  const [showResults, setShowResults] = useState(false);

  // Coefficients d'ensoleillement par région (kWh/kWc/an)
  const sunshineCoefficients = {
    "01": 1150, "02": 1050, "03": 1200, "04": 1450, "05": 1350, "06": 1500, 
    "07": 1350, "08": 1050, "09": 1300, "10": 1100, "11": 1400, "12": 1250,
    "13": 1500, "14": 1050, "15": 1200, "16": 1250, "17": 1300, "18": 1150,
    "19": 1200, "21": 1150, "22": 1100, "23": 1150, "24": 1250, "25": 1150,
    "26": 1350, "27": 1050, "28": 1100, "29": 1100, "30": 1400, "31": 1350,
    "32": 1300, "33": 1300, "34": 1450, "35": 1100, "36": 1150, "37": 1150,
    "38": 1250, "39": 1150, "40": 1300, "41": 1150, "42": 1250, "43": 1250,
    "44": 1200, "45": 1150, "46": 1250, "47": 1300, "48": 1250, "49": 1150,
    "50": 1100, "51": 1100, "52": 1100, "53": 1150, "54": 1100, "55": 1100,
    "56": 1100, "57": 1050, "58": 1100, "59": 1000, "60": 1050, "61": 1100,
    "62": 1000, "63": 1200, "64": 1300, "65": 1300, "66": 1500, "67": 1100,
    "68": 1100, "69": 1250, "70": 1100, "71": 1150, "72": 1150, "73": 1250,
    "74": 1250, "75": 1100, "76": 1050, "77": 1100, "78": 1100, "79": 1200,
    "80": 1050, "81": 1350, "82": 1350, "83": 1500, "84": 1450, "85": 1200,
    "86": 1200, "87": 1200, "88": 1100, "89": 1100, "90": 1100, "91": 1100,
    "92": 1100, "93": 1100, "94": 1100, "95": 1100
  };

  const calculateSavings = () => {
    if (postalCode.length >= 2) {
      setShowResults(true);
    }
  };

  // CALCULS RÉALISTES
  const dept = postalCode.substring(0, 2);
  const sunshineHours = sunshineCoefficients[dept] || 1150; // kWh/kWc/an
  
  // 1. Consommation annuelle
  const annualConsumption = monthlyBill * 12;
  const annualConsumptionKwh = annualConsumption / 0.20; // 0.20€/kWh moyenne
  
  // 2. Puissance installable (6m² par kWc)
  const maxPowerKwc = Math.floor(roofArea / 6);
  const recommendedPower = Math.min(maxPowerKwc, Math.ceil(annualConsumptionKwh / sunshineHours));
  
  // 3. Production annuelle
  const annualProduction = recommendedPower * sunshineHours;
  
  // 4. Taux d'autoconsommation
  const productionRatio = annualProduction / annualConsumptionKwh;
  const autoconsoRate = productionRatio > 1.2 ? 0.50 : productionRatio > 0.8 ? 0.70 : 0.80;
  
  // 5. Économies annuelles
  const autoconsumedKwh = annualProduction * autoconsoRate;
  const annualSavings = Math.min(autoconsumedKwh * 0.20, annualConsumption);
  
  // 6. Coût installation (prix réalistes 2026)
  let pricePerKwc;
  if (recommendedPower <= 3) pricePerKwc = 2800;
  else if (recommendedPower <= 6) pricePerKwc = 2300;
  else if (recommendedPower <= 9) pricePerKwc = 2000;
  else pricePerKwc = 1800;
  
  const installationCost = recommendedPower * pricePerKwc;
  
  // 7. Aides
  const maprimerenov = Math.min(recommendedPower * 350, 2500);
  const cee = Math.min(recommendedPower * 200, 1500);
  const totalAides = maprimerenov + cee;
  const finalCost = installationCost - totalAides;
  
  // 8. ROI
  const paybackYears = Math.round(finalCost / annualSavings);
  
  // 9. Économies 25 ans (avec inflation 4%/an)
  let cumulativeSavings = 0;
  let currentSavings = annualSavings;
  for (let year = 1; year <= 25; year++) {
    cumulativeSavings += currentSavings;
    currentSavings *= 1.04;
  }
  const savings25Years = Math.round(cumulativeSavings - finalCost);
  
  // 10. Réduction mensuelle
  const monthlySavings = Math.round(annualSavings / 12);
  const reductionPercent = Math.round((annualSavings / annualConsumption) * 100);

  return (
    <section id="calculator" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container-page">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Calculator className="inline w-4 h-4 mr-1" />
            Simulateur d'Économies
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Estimez vos économies
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 mt-2">
              en 2 minutes
            </span>
          </h2>

          <p className="text-lg text-gray-600 font-light">
            Simulation basée sur des données réelles de production et de consommation en France.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Formulaire */}
            <div className="bg-white rounded-3xl border-2 border-gray-200 p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">
                Vos informations
              </h3>

              {/* Facture mensuelle */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Facture d'électricité mensuelle
                </label>
                <div className="relative mb-4">
                  <input
                    type="range"
                    min="50"
                    max="500"
                    step="10"
                    value={monthlyBill}
                    onChange={(e) => setMonthlyBill(Number(e.target.value))}
                    className="w-full h-2 bg-gradient-to-r from-yellow-200 to-orange-400 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>50€</span>
                    <span className="font-semibold text-orange-600 text-lg">{monthlyBill}€/mois</span>
                    <span>500€</span>
                  </div>
                </div>
              </div>

              {/* Code postal */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Code postal
                </label>
                <div className="relative">
                  <Sun className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="75001"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value.replace(/\D/g, "").substring(0, 5))}
                    maxLength="5"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors font-light"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1 font-light">
                  Pour calculer l'ensoleillement de votre région
                </p>
              </div>

              {/* Surface toiture */}
              <div className="mb-8">
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
                    onChange={(e) => setRoofArea(Number(e.target.value))}
                    className="w-full h-2 bg-gradient-to-r from-yellow-200 to-orange-400 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>15m²</span>
                    <span className="font-semibold text-orange-600 text-lg">{roofArea}m²</span>
                    <span>100m²</span>
                  </div>
                </div>
              </div>

              {/* Bouton */}
              <button
                onClick={calculateSavings}
                disabled={postalCode.length < 2}
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2 ${
                  postalCode.length >= 2
                    ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-lg hover:shadow-xl hover:scale-105"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                <Calculator className="w-5 h-5" />
                Calculer mes économies
                <ArrowRight className="w-5 h-5" />
              </button>

              {postalCode.length < 2 && (
                <p className="text-xs text-orange-600 mt-3 text-center font-light">
                  Entrez votre code postal pour calculer
                </p>
              )}
            </div>

            {/* Résultats */}
            <div>
              {showResults && postalCode.length >= 2 ? (
                <div className="space-y-6">
                  {/* Installation recommandée */}
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl border-2 border-orange-200 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 font-light">Installation recommandée</div>
                        <div className="text-3xl font-bold text-gray-900">{recommendedPower} kWc</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-700 font-light">
                      ~{Math.ceil(recommendedPower / 0.4)} panneaux · Production : {annualProduction.toLocaleString()} kWh/an
                    </div>
                  </div>

                  {/* Coût */}
                  <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <Euro className="w-6 h-6 text-orange-600 mt-1" />
                      <div className="flex-1">
                        <div className="text-sm text-gray-600 font-light mb-2">Coût de l'installation</div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Prix total</span>
                            <span className="font-semibold">{installationCost.toLocaleString()}€</span>
                          </div>
                          <div className="flex justify-between text-green-600">
                            <span>Aides d'État</span>
                            <span className="font-semibold">-{totalAides.toLocaleString()}€</span>
                          </div>
                          <div className="border-t border-gray-200 pt-2 flex justify-between">
                            <span className="font-bold text-gray-900">Reste à charge</span>
                            <span className="text-2xl font-bold text-orange-600">{finalCost.toLocaleString()}€</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Économies */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 p-6">
                    <div className="flex items-start gap-3">
                      <TrendingDown className="w-6 h-6 text-green-600 mt-1" />
                      <div className="flex-1">
                        <div className="text-sm text-gray-600 font-light mb-3">Vos économies</div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <div className="text-2xl font-bold text-green-600">-{reductionPercent}%</div>
                            <div className="text-xs text-gray-600">sur votre facture</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-green-600">{monthlySavings}€/mois</div>
                            <div className="text-xs text-gray-600">économisés</div>
                          </div>
                        </div>
                        <div className="bg-white rounded-xl p-4 space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Retour sur investissement</span>
                            <span className="font-bold text-gray-900">{paybackYears} ans</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Économies sur 25 ans</span>
                            <span className="font-bold text-green-600">+{savings25Years.toLocaleString()}€</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Disclaimer */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-blue-800 font-light leading-relaxed">
                      <strong className="font-semibold">Estimation indicative</strong> basée sur des moyennes régionales. 
                      Pour un chiffrage précis tenant compte de l'orientation, l'inclinaison et les ombrages de votre toiture, 
                      demandez une étude de faisabilité gratuite.
                    </p>
                  </div>

                  {/* CTA */}
                  <Link
                    to="/#form"
                    className="block w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-xl font-semibold text-center shadow-lg hover:shadow-xl transition-all hover:scale-105"
                    >
                    Obtenir mon étude personnalisée gratuite →
                    </Link>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-300 p-12">
                  <div className="text-center">
                    <Calculator className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-light">
                      Renseignez vos informations<br />pour voir vos résultats
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}