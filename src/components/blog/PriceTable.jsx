import { useState } from "react";
import { ChevronDown, ChevronUp, Check, X, HelpCircle } from "lucide-react";

export default function PriceTable({ data, title, description }) {
  const [expanded, setExpanded] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = (key) => {
    if (sortBy === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(key);
      setSortAsc(true);
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortBy) return 0;
    const aVal = a[sortBy];
    const bVal = b[sortBy];
    if (typeof aVal === 'number') {
      return sortAsc ? aVal - bVal : bVal - aVal;
    }
    return sortAsc ? String(aVal).localeCompare(String(bVal)) : String(bVal).localeCompare(String(aVal));
  });

  const headers = data.length > 0 ? Object.keys(data[0]).filter(k => k !== 'details') : [];

  return (
    <div className="my-8 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
      {title && (
        <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              {headers.map((header) => (
                <th
                  key={header}
                  onClick={() => handleSort(header)}
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    {header}
                    {sortBy === header && (
                      sortAsc ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
              ))}
              {data[0]?.details && <th className="px-4 py-3 w-10"></th>}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, index) => (
              <>
                <tr
                  key={index}
                  className={`border-t border-gray-100 ${expanded === index ? 'bg-orange-50' : 'hover:bg-gray-50'} transition-colors`}
                >
                  {headers.map((header) => (
                    <td key={header} className="px-4 py-3 text-sm text-gray-700">
                      {typeof row[header] === 'boolean' ? (
                        row[header] ? (
                          <Check className="w-5 h-5 text-green-500" />
                        ) : (
                          <X className="w-5 h-5 text-red-500" />
                        )
                      ) : (
                        row[header]
                      )}
                    </td>
                  ))}
                  {row.details && (
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setExpanded(expanded === index ? null : index)}
                        className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        <HelpCircle className="w-5 h-5 text-gray-400" />
                      </button>
                    </td>
                  )}
                </tr>
                {expanded === index && row.details && (
                  <tr className="bg-orange-50">
                    <td colSpan={headers.length + 1} className="px-4 py-3 text-sm text-gray-600 border-t border-orange-100">
                      {row.details}
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
