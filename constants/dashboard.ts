export const DASHBOARD_METRIC: {
  type: number;
  title: string;
  default: number | string;
}[] = [
  { type: 1, title: "Active Prs", default: 25 },
  { type: 2, title: "Connected Repos", default: 3 },
  { type: 3, title: "Avg Review Time", default: "3.2 hours" },
];

export const FILTER_BY_STATUS: {
  type: number;
  title: string;
  value: string;
}[] = [
  { type: 1, title: "All statuses", value: "all" },
  { type: 2, title: "Reviewed", value: "reviewed" },
  { type: 3, title: "Pending", value: "pending" },
  { type: 4, title: "Changes Requested", value: "changes" },
];

export const FILTER_BY_ATTRIBUTES = [
  { type: 1, title: "Newest First", value: "newest" },
  { type: 2, title: "Oldest First", value: "oldest" },
  { type: 3, title: "Code Quality", value: "code_quality" },
  { type: 4, title: "Security Score", value: "security_score" },
  { type: 5, title: "Performance Score", value: "performance_score" },
];

export const LANGUAGE_COLOR: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Python: "#3572A5",
  Java: "#b07219",
  C: "#555555",
  "C++": "#f34b7d",
  "C#": "#178600",
  PHP: "#4F5D95",
  Go: "#00ADD8",
  Ruby: "#701516",
  Swift: "#ffac45",
  Kotlin: "#A97BFF",
  Rust: "#dea584",
  Shell: "#89e051",
  Dart: "#00B4AB",
  Vue: "#41b883",
  SCSS: "#c6538c",
};
