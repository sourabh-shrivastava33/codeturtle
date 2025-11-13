import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { SearchIcon } from "lucide-react";

import CustomDropDown from "./CustomDropDown";
import { FILTER_BY_ATTRIBUTES, FILTER_BY_STATUS } from "@/constants/dashboard";
import { fetchUserData } from "@/lib/actions/user";
import { useFetchusersData } from "@/hooks/use-user";
import { useFetchAllPRs } from "@/hooks/use-pr";
import { UserDataType } from "@/lib/types/user";
import PRtab from "./PRtab";
import PaginationComponent from "./Pagination";
import EmptyState from "@/components/dashboard/EmtpyStateComponent"; // Add this import
import { useTheme } from "next-themes"; // Or your theme hook

interface RecentPrProps {
  prSearch: string;
  sortByPrStatus: string;
  sortByAttributes: string;
  setPrSearch: React.Dispatch<React.SetStateAction<string>>;
  setSortByPrStatus: React.Dispatch<React.SetStateAction<string>>;
  setSortByAttributes: React.Dispatch<React.SetStateAction<string>>;
  user: UserDataType;
  isAllApiLoaded?: boolean;
  setIsAllApiLoaded?: (status: boolean) => void;
}

const RecentPr = ({
  prSearch,
  setPrSearch,
  setSortByAttributes,
  setSortByPrStatus,
  sortByAttributes,
  sortByPrStatus,
  user,
}: RecentPrProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { theme } = useTheme(); // Get current theme
  const isDark = theme === "dark";

  const allPr = useFetchAllPRs(user?.githubCreds?.id, {
    enabled: !!user?.githubCreds?.id,
  });

  const MAX_ITEMS_COUNT = 5;

  const allPrData = allPr.data || [];

  const totalPages = Math.ceil(allPrData.length / MAX_ITEMS_COUNT);
  const startIndex = (currentPage - 1) * MAX_ITEMS_COUNT;
  const endIndex = currentPage * MAX_ITEMS_COUNT;
  const currentPagePrs = allPrData.slice(startIndex, endIndex);

  function handlePagination(page: number) {
    setCurrentPage(page);
  }

  const hasPRs = allPr.isSuccess && allPrData.length > 0;

  return (
    <div className="bg-card rounded-2xl border-2 border-border mb-5 md:mb-0 lg:h-full lg:flex lg:flex-col">
      <Card className="border-0 shadow-none lg:h-full lg:flex lg:flex-col">
        <CardHeader>
          <h2 className="font-semibold tracking-wide text-foreground ">
            Recent Pull Requests
          </h2>
          <p className="-mt-2 text-sm text-muted-foreground font-light">
            View and manage pull requests across your repositories
          </p>
        </CardHeader>
        <CardContent className="lg:flex-1 lg:flex lg:flex-col">
          {/* Only show search and filters if there are PRs */}
          {hasPRs && (
            <>
              <InputGroup>
                <InputGroupInput
                  placeholder="Search pull requests"
                  type="text"
                  value={prSearch}
                  onChange={(e) => setPrSearch(e.target.value)}
                  className="focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500"
                />
                <InputGroupAddon>
                  <SearchIcon size={20} />
                </InputGroupAddon>
              </InputGroup>
              <div className="flex items-center gap-3 mt-5">
                <CustomDropDown
                  data={FILTER_BY_STATUS}
                  value={sortByPrStatus}
                  setValue={setSortByPrStatus}
                />
                <CustomDropDown
                  data={FILTER_BY_ATTRIBUTES}
                  value={sortByAttributes}
                  setValue={setSortByAttributes}
                />
              </div>
            </>
          )}

          {/* PR List or Empty State */}
          <div className="mt-5 lg:flex-1 lg:overflow-y-auto lg:flex lg:items-center lg:justify-center">
            {hasPRs ? (
              <div className="w-full space-y-2">
                {currentPagePrs.map((pr) => (
                  <PRtab key={pr.id} pr={pr} />
                ))}
              </div>
            ) : (
              <EmptyState
                type="pullRequest"
                isDark={isDark}
                onAction={() => {
                  // Handle connect repository action
                  window.location.href = "/add-repository"; // or use router.push()
                }}
              />
            )}
          </div>
        </CardContent>

        {/* Only show pagination if there are multiple pages */}
        {hasPRs && totalPages > 1 && (
          <PaginationComponent
            totalPages={totalPages}
            currentPage={currentPage}
            handlePagination={handlePagination}
          />
        )}
      </Card>
    </div>
  );
};

export default RecentPr;
