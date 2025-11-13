"use client";
import { useState } from "react";
import RecentPr from "./RecentPr";
import RepoManagement from "./RepoManagement";
import { UserDataType } from "@/lib/types/user";
import { useFetchusersData } from "@/hooks/use-user";
import { useFetchAllPRs } from "@/hooks/use-pr";
import { useFetchAllRepo } from "@/hooks/use-repo";
import LoadingState from "./LoadingState";

const DashboardManagement = () => {
  const [prSearch, setPrSearch] = useState("");
  const [sortByPrStatus, setSortByPrStatus] = useState("all");
  const [sortByAttributes, setSortByAttributes] = useState("newest");

  // fetch user (react-query)
  const userQuery = useFetchusersData();
  const user = userQuery.data as UserDataType | undefined;

  // derive github id when available
  const githubId = user?.githubCreds?.id;

  // Prefetch child queries at parent level so we can show a unified loading state
  const prsQuery = useFetchAllPRs(githubId, { enabled: !!githubId });
  const reposQuery = useFetchAllRepo(githubId);

  const isLoading =
    userQuery.isLoading ||
    prsQuery.isLoading ||
    reposQuery.isLoading ||
    userQuery.isFetching ||
    prsQuery.isFetching ||
    reposQuery.isFetching;

  // show a shared loading UI until all required data is available
  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center mt-10">
        <LoadingState />
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 lg:gap-6 lg:items-start mt-10 mb-10">
      <div className="order-2 lg:order-1 lg:col-span-2 lg:h-full">
        <RecentPr
          prSearch={prSearch}
          sortByPrStatus={sortByPrStatus}
          sortByAttributes={sortByAttributes}
          setPrSearch={setPrSearch}
          setSortByPrStatus={setSortByPrStatus}
          setSortByAttributes={setSortByAttributes}
          user={user as UserDataType}
        />
      </div>
      <div className="order-1 lg:order-2 lg:h-full">
        <RepoManagement user={user as UserDataType} />
      </div>
    </div>
  );
};

export default DashboardManagement;
