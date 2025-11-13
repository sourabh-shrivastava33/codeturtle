import React from "react";
import ConnectRepo from "./ConnectRepo";
import ConnectedRepo from "./ConnectedRepo";
import { UserDataType } from "@/lib/types/user";

const RepoManagement = ({ user }: { user: UserDataType }) => {
  return (
    <div className="flex flex-col items-start justify-start gap-3 mb-10 lg:mb-0 lg:h-full">
      <ConnectRepo user={user} />
      <ConnectedRepo user={user} />
    </div>
  );
};

export default RepoManagement;
