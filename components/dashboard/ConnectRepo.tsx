import React, { useState } from "react";
import { Button } from "../ui/button";
import Modal from "../Modal";
import SelectRepoList from "./SelectRepoList";
import { UserDataType } from "@/lib/types/user";

const ConnectRepo = ({ user }: { user: UserDataType }) => {
  const [isRepoModalOpen, setRepoModalOpen] = useState<boolean>(false);
  return (
    <div className="w-full space-y-1 px-4 py-3 border-2 border-border bg-card rounded-2xl">
      <p className="font-semibold text-foreground">Connect more repositories</p>
      <p className="text-xs lg:text-sm mb-4 font-lighter text-muted-foreground">
        Add Github repositories to enable automated code review
      </p>
      <Button
        onClick={() => setRepoModalOpen((ps) => !ps)}
        className="bg-secondary-foreground hover:bg-foreground font-light w-full text-card"
      >
        + Add Repository
      </Button>
      <Modal isOpen={isRepoModalOpen} onClose={() => setRepoModalOpen(false)}>
        <SelectRepoList onRepoAdd={() => setRepoModalOpen(false)} user={user} />
      </Modal>
    </div>
  );
};

export default ConnectRepo;
