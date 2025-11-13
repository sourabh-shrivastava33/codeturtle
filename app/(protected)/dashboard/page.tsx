import DashboardManagement from "@/components/dashboard/DashboardManagement";
import DashboardMetrics from "@/components/dashboard/DashboardMetrics";
import DashboardHeader from "@/components/dashboard/Header";

const DashboardPage = async () => {
  return (
    <div className="mt-10">
      <DashboardHeader />
      <DashboardMetrics />
      <DashboardManagement />
    </div>
  );
};

export default DashboardPage;
