import DashboardManagement from "@/components/dashboard/DashboardManagement";
import DashboardMetrics from "@/components/dashboard/DashboardMetrics";
import DashboardHeader from "@/components/dashboard/Header";
import React from "react";

const DashboardPage = () => {
  return (
    <div className="mt-10">
      <DashboardHeader />
      <DashboardMetrics />
      <DashboardManagement />
    </div>
  );
};

export default DashboardPage;
