import { Clock, GitBranchIcon, GitPullRequest } from "lucide-react";
import { JSX } from "react";

interface MetricCardProps {
  title: string;
  type: number;
  value?: string | number;
}

const icons: Record<number, JSX.Element> = {
  1: <GitPullRequest size={25} className="text-primary/90" />,
  2: <GitBranchIcon size={25} className="text-secondary" />,
  3: <Clock size={25} className="text-green-700" />,
};

const MetricCard = ({ title, type, value }: MetricCardProps) => {
  return (
    <div className="flex items-center justify-between border-2 border-border bg-card px-6 pb-2 rounded-2xl min-h-28 ">
      <div className="space-y-0.5">
        <p className="text-foreground tracking-wide">{title}</p>
        <span className="text-muted-foreground font-bold">
          {value ? value : ""}
        </span>
      </div>
      <div
        className={`flex items-center ${
          type == 1
            ? "bg-primary/25"
            : type == 2
            ? "bg-secondary/25"
            : "bg-green-100"
        } p-2 rounded-sm`}
      >
        {icons[type]}
      </div>
    </div>
  );
};

export default MetricCard;
