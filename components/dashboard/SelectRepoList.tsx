import { useGetUserGithubData } from "@/hooks/use-user";
import React, { useState } from "react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group";
import { SearchIcon } from "lucide-react";
import RepoList from "./RepoList";
import PaginationComponent from "./Pagination";
import { Button } from "../ui/button";
import LoadingState from "./LoadingState";

const SelectRepoList = () => {
  const { isLoading, data: githubData } = useGetUserGithubData();
  const [currentPage, setCurrentPage] = useState(1);

  // Selected repository state
  const [selectedRepoId, setSelectedRepoId] = useState<number | string | null>(
    null
  );

  const data = githubData?.repos || [];

  const MAX_ITEMS_COUNT = 5;

  const totalPages: number = Math.ceil(data.length / MAX_ITEMS_COUNT);
  const startIndex: number = (currentPage - 1) * MAX_ITEMS_COUNT;
  const endIndex: number = currentPage * MAX_ITEMS_COUNT;
  const currentData = githubData?.repos.slice(startIndex, endIndex);

  function handlePagination(page: number) {
    setCurrentPage(page);
  }

  function handleSelectRepo(repoId: number | string) {
    setSelectedRepoId((prevRepoId) => (prevRepoId === repoId ? null : repoId));
  }

  return (
    <div className="md:min-w-xl max-w-3xl  bg-card p-4 h-auto max-h-[90vh]">
      <h2 className="font-semibold text-lg text-foreground">
        Add Repositories
      </h2>
      <p className="font-normal text-sm text-muted-foreground mt-2  mb-3">
        Browse and connect GitHub repositories to enable automated code reviews.
        Connected repositories are shown with a checkmark.
      </p>

      <InputGroup className="mb-5">
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <InputGroupButton className="bg-foreground text-card hover:bg-primary">
            Search
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>

      {isLoading ? (
        <LoadingState />
      ) : (
        <>
          <div className="flex flex-col justify-start   px-2 min-h-[50vh] max-h-[60vh] mb-2  overflow-y-auto">
            {currentData?.map((d) => (
              <RepoList
                fullName={d.full_name}
                forksCount={d.forks_count}
                connected={false}
                isPrivate={d.private}
                language={d.language}
                star={d.stargazers_count}
                selectedRepoId={selectedRepoId}
                handleSelectRepo={handleSelectRepo}
                key={d.id}
                id={d.id}
                description={d.description}
              />
            ))}
          </div>
          {selectedRepoId && (
            <Button className="w-full my-2 bg-primary-foreground text-gray-900 hover:bg-primary/60 hover:text-white transition-all delay-50">
              + Add Repositories
            </Button>
          )}

          {totalPages > 1 && (
            <PaginationComponent
              totalPages={totalPages}
              currentPage={currentPage}
              handlePagination={handlePagination}
            />
          )}
        </>
      )}
    </div>
  );
};

export default SelectRepoList;
