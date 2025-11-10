import { Clock, GitBranchIcon, GitPullRequest } from "lucide-react";
import { JSX } from "react";

interface MetricCardProps {
  title: string;
  type: number;
  value?: string | number;
}

// Soft, modern gradient backgrounds for each card
const cardColors: Record<number, string> = {
  1: "bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100", // Soft blue
  2: "bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100", // Soft purple
  3: "bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100", // Soft orange
};

const icons: Record<number, JSX.Element> = {
  1: <GitPullRequest size={28} className="text-blue-600" strokeWidth={2} />,
  2: <GitBranchIcon size={28} className="text-purple-600" strokeWidth={2} />,
  3: <Clock size={28} className="text-orange-600" strokeWidth={2} />,
};

const textColors: Record<number, string> = {
  1: "text-blue-900",
  2: "text-purple-900",
  3: "text-orange-900",
};

const iconBgColors: Record<number, string> = {
  1: "bg-blue-100",
  2: "bg-purple-100",
  3: "bg-orange-100",
};

const MetricCard = ({ title, type, value }: MetricCardProps) => {
  return (
    <div
      className={`flex items-center justify-between px-6 py-5 rounded-xl min-h-28 shadow-sm transition-all hover:shadow-md ${cardColors[type]}`}
    >
      <div className="space-y-1">
        <p
          className={`text-xs font-semibold uppercase tracking-wider ${textColors[type]} opacity-70`}
        >
          {title}
        </p>
        <span className={`text-3xl font-bold ${textColors[type]}`}>
          {value ?? ""}
        </span>
      </div>
      <div
        className={`flex items-center justify-center ${iconBgColors[type]} p-3 rounded-lg`}
      >
        {icons[type]}
      </div>
    </div>
  );
};

export default MetricCard;
