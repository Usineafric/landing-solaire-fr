import { Info, AlertTriangle, CheckCircle, Lightbulb, AlertCircle } from "lucide-react";

const variants = {
  info: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    icon: Info,
    iconColor: "text-blue-500",
    titleColor: "text-blue-800"
  },
  warning: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    icon: AlertTriangle,
    iconColor: "text-yellow-500",
    titleColor: "text-yellow-800"
  },
  success: {
    bg: "bg-green-50",
    border: "border-green-200",
    icon: CheckCircle,
    iconColor: "text-green-500",
    titleColor: "text-green-800"
  },
  tip: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    icon: Lightbulb,
    iconColor: "text-purple-500",
    titleColor: "text-purple-800"
  },
  danger: {
    bg: "bg-red-50",
    border: "border-red-200",
    icon: AlertCircle,
    iconColor: "text-red-500",
    titleColor: "text-red-800"
  }
};

export default function InfoBox({ type = "info", title, children }) {
  const variant = variants[type] || variants.info;
  const Icon = variant.icon;

  return (
    <div className={`my-6 p-5 rounded-xl border-l-4 ${variant.bg} ${variant.border}`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-6 h-6 flex-shrink-0 ${variant.iconColor}`} />
        <div className="flex-1">
          {title && (
            <h4 className={`font-bold mb-2 ${variant.titleColor}`}>{title}</h4>
          )}
          <div className="text-gray-700 prose prose-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}
