import { DASHBOARD_METRIC } from "@/constants/dashboard";
import React from "react";
import MetricCard from "./MetricCard";

const DashboardMetrics = () => {
  return (
    <div className="grid md:grid-cols-3 mt-5 gap-4 w-full">
      {DASHBOARD_METRIC.map((m) => (
        <MetricCard
          title={m.title}
          type={m.type}
          value={m.default}
          key={m.type}
        />
      ))}
    </div>
  );
};

export default DashboardMetrics;
