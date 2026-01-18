import { useState } from "react";
import { HelpCircle, CheckCircle, XCircle, RotateCcw, Trophy } from "lucide-react";

const quizQuestions = [
  {
    question: "Quelle est la durée de vie moyenne d'un panneau solaire ?",
    options: ["10-15 ans", "20-25 ans", "30-40 ans", "50+ ans"],
    correct: 2,
    explanation: "Les panneaux solaires modernes ont une durée de vie de 30 à 40 ans. Après 25 ans, ils produisent encore 80% de leur capacité initiale."
  },
  {
    question: "Quel est le taux de TVA pour une installation de 3 kWc ou moins ?",
    options: ["5,5%", "10%", "15%", "20%"],
    correct: 1,
    explanation: "Les installations de 3 kWc ou moins bénéficient d'une TVA réduite à 10% si le logement a plus de 2 ans."
  },
  {
    question: "Combien de panneaux faut-il environ pour une installation de 6 kWc ?",
    options: ["6-8 panneaux", "10-12 panneaux", "14-16 panneaux", "20-24 panneaux"],
    correct: 2,
    explanation: "Avec des panneaux de 400-450 Wc, il faut environ 14 à 16 panneaux pour atteindre 6 kWc."
  },
  {
    question: "En moyenne, quel est le temps de retour sur investissement en France ?",
    options: ["3-5 ans", "8-12 ans", "15-20 ans", "Plus de 20 ans"],
    correct: 1,
    explanation: "Le temps de retour sur investissement moyen en France est de 8 à 12 ans selon la région, pour une durée de vie de 30+ ans."
  },
  {
    question: "Quelle orientation de toiture est optimale pour les panneaux solaires ?",
    options: ["Nord", "Est", "Sud", "Ouest"],
    correct: 2,
    explanation: "L'orientation Sud est optimale en France. Une orientation Est ou Ouest entraîne une perte de seulement 15-20%."
  },
  {
    question: "Le solaire est-il rentable dans le Nord de la France ?",
    options: ["Non, jamais rentable", "Oui, mais en 20+ ans", "Oui, en 10-12 ans", "Aussi rentable que dans le Sud"],
    correct: 2,
    explanation: "Le solaire est rentable dans le Nord de la France avec un amortissement de 10-12 ans. La différence avec le Sud n'est que de 2-3 ans."
  }
];

export default function SolarQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    setShowExplanation(true);
    if (index === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
  };

  const question = quizQuestions[currentQuestion];

  if (quizCompleted) {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    return (
      <div className="my-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
        <div className="text-center">
          <Trophy className={`w-16 h-16 mx-auto mb-4 ${percentage >= 80 ? 'text-yellow-500' : percentage >= 50 ? 'text-gray-400' : 'text-orange-400'}`} />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Quiz terminé !</h3>
          <p className="text-4xl font-bold text-purple-600 mb-4">{score}/{quizQuestions.length}</p>
          <p className="text-gray-600 mb-6">
            {percentage >= 80 && "Excellent ! Vous êtes un expert du solaire !"}
            {percentage >= 50 && percentage < 80 && "Bien joué ! Vous avez de bonnes connaissances."}
            {percentage < 50 && "Continuez à apprendre ! Lisez nos articles pour en savoir plus."}
          </p>
          <button
            onClick={resetQuiz}
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Recommencer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="my-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
            <HelpCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Quiz Solaire</h3>
            <p className="text-gray-600 text-sm">Testez vos connaissances</p>
          </div>
        </div>
        <div className="text-sm font-semibold text-purple-600">
          {currentQuestion + 1}/{quizQuestions.length}
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-purple-100 rounded-full h-2 mb-6">
        <div
          className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
        />
      </div>

      <p className="text-lg font-semibold text-gray-900 mb-4">{question.question}</p>

      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => !showExplanation && handleAnswer(index)}
            disabled={showExplanation}
            className={`w-full p-4 rounded-xl text-left transition-all ${
              showExplanation
                ? index === question.correct
                  ? 'bg-green-100 border-2 border-green-500 text-green-800'
                  : index === selectedAnswer
                    ? 'bg-red-100 border-2 border-red-500 text-red-800'
                    : 'bg-gray-100 text-gray-500'
                : 'bg-white border-2 border-gray-200 hover:border-purple-400 hover:bg-purple-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span>{option}</span>
              {showExplanation && index === question.correct && (
                <CheckCircle className="w-5 h-5 text-green-600" />
              )}
              {showExplanation && index === selectedAnswer && index !== question.correct && (
                <XCircle className="w-5 h-5 text-red-600" />
              )}
            </div>
          </button>
        ))}
      </div>

      {showExplanation && (
        <div className="bg-white rounded-xl p-4 mb-4 border border-purple-200">
          <p className="text-gray-700">{question.explanation}</p>
        </div>
      )}

      {showExplanation && (
        <button
          onClick={nextQuestion}
          className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
        >
          {currentQuestion < quizQuestions.length - 1 ? 'Question suivante' : 'Voir mon score'}
        </button>
      )}
    </div>
  );
}
