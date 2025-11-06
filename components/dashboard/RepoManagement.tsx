import React from "react";
import ConnectRepo from "./ConnectRepo";
import ConnectedRepo from "./ConnectedRepo";

const RepoManagement = () => {
  return (
    <div className="flex md:flex-col items-start justify-start gap-3">
      <ConnectRepo />
      <ConnectedRepo />
    </div>
  );
};

export default RepoManagement;
