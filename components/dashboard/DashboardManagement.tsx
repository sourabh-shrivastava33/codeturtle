"use client";
import { useState } from "react";
import RecentPr from "./RecentPr";
import RepoManagement from "./RepoManagement";
import { UserDataType } from "@/lib/types/user";
import { useFetchusersData } from "@/hooks/use-user";

const DashboardManagement = () => {
  const [prSearch, setPrSearch] = useState("");
  const [sortByPrStatus, setSortByPrStatus] = useState("all");
  const [sortByAttributes, setSortByAttributes] = useState("reviewed");
  const user = useFetchusersData();
  return (
    <div className="grid md:grid-cols-3 md:space-x-6 mt-10 mb-10">
      <RecentPr
        prSearch={prSearch}
        sortByPrStatus={sortByPrStatus}
        sortByAttributes={sortByAttributes}
        setPrSearch={setPrSearch}
        setSortByPrStatus={setSortByPrStatus}
        setSortByAttributes={setSortByAttributes}
        user={user.data as UserDataType}
      />
      <RepoManagement user={user.data as UserDataType} />
    </div>
  );
};

export default DashboardManagement;
