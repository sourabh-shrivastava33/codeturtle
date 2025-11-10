import React from "react";
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
interface RecentPrProps {
  prSearch: string;
  sortByPrStatus: string;
  sortByAttributes: string;
  setPrSearch: React.Dispatch<React.SetStateAction<string>>;
  setSortByPrStatus: React.Dispatch<React.SetStateAction<string>>;
  setSortByAttributes: React.Dispatch<React.SetStateAction<string>>;
  user: UserDataType;
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
  const allPr = useFetchAllPRs(user?.githubCreds?.id, {
    enabled: !!user?.githubCreds?.id, // ✅ only fetch PRs when user ID exists
  });

  return (
    <div className="md:col-span-2 bg-card rounded-2xl  border-2 border-border mb-5 md:mb-0">
      <Card className="border-0 shadow-none">
        <CardHeader>
          <h2 className="font-semibold tracking-wide text-foreground ">
            Recent Pull Requests
          </h2>
          <p className="-mt-2 text-sm text-muted-foreground font-light">
            View and manage pull requests across your repositories
          </p>
        </CardHeader>
        <CardContent>
          <InputGroup>
            <InputGroupInput
              placeholder="Search pull requests"
              type="text"
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
          <div>
            {allPr.isSuccess &&
              allPr.data.map((pr) => <p key={pr.id}>{pr.title}</p>)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecentPr;
