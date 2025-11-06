"use client";
import { useState } from "react";
import RecentPr from "./RecentPr";
import RepoManagement from "./RepoManagement";

const DashboardManagement = () => {
  const [prSearch, setPrSearch] = useState("");
  const [sortByPrStatus, setSortByPrStatus] = useState("all");
  const [sortByAttributes, setSortByAttributes] = useState("reviewed");
  return (
    <div className="grid md:grid-cols-3 md:space-x-6 mt-10">
      <RecentPr
        prSearch={prSearch}
        sortByPrStatus={sortByPrStatus}
        sortByAttributes={sortByAttributes}
        setPrSearch={setPrSearch}
        setSortByPrStatus={setSortByPrStatus}
        setSortByAttributes={setSortByAttributes}
      />
      <RepoManagement />
    </div>
  );
};

export default DashboardManagement;
