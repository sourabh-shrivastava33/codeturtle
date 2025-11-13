// EmptyState.tsx
import React from "react";
import { GitBranch, GitPullRequest, Plus, LucideIcon } from "lucide-react";

interface EmptyStateConfig {
  icon: LucideIcon;
  title: string;
  description: string;
  actionText: string;
  gradient: string;
}

interface EmptyStateProps {
  type: "repository" | "pullRequest";
  onAction?: () => void;
  isDark?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  type,
  onAction,
  isDark = false,
}) => {
  const configs: Record<string, EmptyStateConfig> = {
    repository: {
      icon: GitBranch,
      title: "No repositories connected",
      description: "Add GitHub repositories to enable automated code review",
      actionText: "Add Repository",
      gradient: "from-purple-500 to-pink-500",
    },
    pullRequest: {
      icon: GitPullRequest,
      title: "No pull requests yet",
      description:
        "Pull requests will appear here once repositories are connected",
      actionText: "Connect Repository",
      gradient: "from-blue-500 to-cyan-500",
    },
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <div
      className={`flex flex-col items-center justify-center py-8 px-4 rounded-lg ${
        isDark ? "bg-gray-900/50" : "bg-gray-50"
      }`}
    >
      {/* Animated Icon Container */}
      <div className={`relative mb-4 group`}>
        <div
          className={`absolute inset-0 bg-gradient-to-r ${config.gradient} rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300`}
        ></div>
        <div
          className={`relative ${
            isDark ? "bg-gray-800" : "bg-white"
          } rounded-full p-4 shadow-lg`}
        >
          <Icon
            className={`w-8 h-8 ${
              isDark ? "text-gray-400" : "text-gray-500"
            } group-hover:scale-110 transition-transform duration-300`}
          />
        </div>
      </div>

      {/* Text Content */}
      <h3
        className={`text-base font-semibold mb-1 ${
          isDark ? "text-gray-100" : "text-gray-900"
        }`}
      >
        {config.title}
      </h3>
      <p
        className={`text-center text-xs max-w-xs mb-4 ${
          isDark ? "text-gray-400" : "text-gray-600"
        }`}
      >
        {config.description}
      </p>

      {/* Action Button */}
      {onAction && (
        <button
          onClick={onAction}
          className={`flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg font-medium transition-all duration-200 ${
            isDark
              ? "bg-white text-gray-900 hover:bg-gray-100 shadow-lg"
              : "bg-gray-900 text-white hover:bg-gray-800 shadow-md"
          } hover:scale-105 active:scale-95`}
        >
          <Plus className="w-4 h-4" />
          {config.actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
