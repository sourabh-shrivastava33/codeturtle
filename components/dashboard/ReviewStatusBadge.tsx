import React from "react";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";
import { reviewStatus } from "@prisma/client";

const ReviewStatusBadge = ({ status }: { status: reviewStatus }) => {
  const getStatusConfig = (status: reviewStatus) => {
    switch (status) {
      case "COMPLETED":
        return {
          icon: CheckCircle,
          text: "Reviewed",
          bgColor: "bg-emerald-50 dark:bg-emerald-950/40",
          borderColor: "border-emerald-200 dark:border-emerald-500/30",
          textColor: "text-emerald-700 dark:text-emerald-400",
          iconColor: "text-emerald-600 dark:text-emerald-500",
        };
      case "PENDING":
        return {
          icon: Clock,
          text: "Pending Review",
          bgColor: "bg-amber-50 dark:bg-amber-950/40",
          borderColor: "border-amber-200 dark:border-amber-500/30",
          textColor: "text-amber-700 dark:text-amber-400",
          iconColor: "text-amber-600 dark:text-amber-500",
        };
      case "REQUESTED_CHANGE":
        return {
          icon: AlertCircle,
          text: "Changes Requested",
          bgColor: "bg-red-50 dark:bg-red-950/40",
          borderColor: "border-red-200 dark:border-red-500/30",
          textColor: "text-red-700 dark:text-red-400",
          iconColor: "text-red-600 dark:text-red-500",
        };
      default:
        return {
          icon: Clock,
          text: "Unknown",
          bgColor: "bg-gray-50 dark:bg-gray-950/40",
          borderColor: "border-gray-200 dark:border-gray-500/30",
          textColor: "text-gray-700 dark:text-gray-400",
          iconColor: "text-gray-600 dark:text-gray-500",
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <div
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border backdrop-blur-sm ${config.bgColor} ${config.borderColor}`}
    >
      <Icon className={`w-3 h-3 ${config.iconColor}`} />
      <span className={`text-xs font-medium ${config.textColor}`}>
        {config.text}
      </span>
    </div>
  );
};

export default ReviewStatusBadge;
