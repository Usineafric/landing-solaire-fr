import { useState } from "react";
import { CheckSquare, Square, ListChecks } from "lucide-react";

export default function Checklist({ title, items, description }) {
  const [checked, setChecked] = useState(items.map(() => false));

  const toggleItem = (index) => {
    const newChecked = [...checked];
    newChecked[index] = !newChecked[index];
    setChecked(newChecked);
  };

  const progress = Math.round((checked.filter(Boolean).length / items.length) * 100);

  return (
    <div className="my-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
          <ListChecks className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          {description && <p className="text-gray-600 text-sm">{description}</p>}
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600">{progress}%</div>
          <div className="text-xs text-gray-500">complété</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-green-100 rounded-full h-2 mb-6">
        <div
          className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="space-y-2">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => toggleItem(index)}
            className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all ${
              checked[index]
                ? 'bg-green-100 border border-green-300'
                : 'bg-white border border-gray-200 hover:border-green-300 hover:bg-green-50'
            }`}
          >
            {checked[index] ? (
              <CheckSquare className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            ) : (
              <Square className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
            )}
            <span className={`text-sm ${checked[index] ? 'text-green-800 line-through' : 'text-gray-700'}`}>
              {item}
            </span>
          </button>
        ))}
      </div>

      {progress === 100 && (
        <div className="mt-4 p-3 bg-green-100 rounded-xl text-center">
          <span className="text-green-800 font-semibold">Bravo ! Vous avez tout vérifié !</span>
        </div>
      )}
    </div>
  );
}
