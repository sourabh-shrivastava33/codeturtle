import { useGetUserGithubData } from "@/hooks/use-user";
import { useEffect, useState } from "react";

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
import { useSaveRepo } from "@/hooks/use-repo";
import { ListReposResponse, RepositoryListItem } from "@/lib/types/pr";
import { UserDataType } from "@/lib/types/user";

const SelectRepoList = ({
  onRepoAdd,
  user,
}: {
  onRepoAdd: () => void;
  user: UserDataType;
}) => {
  const { isLoading, data: githubData } = useGetUserGithubData();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRepoId, setSelectedRepoId] = useState<number | string | null>(
    null
  );

  // Save repositories mutation
  const mutation = useSaveRepo(user?.githubCreds?.id);

  const allRepos = githubData?.repos || [];
  const MAX_ITEMS_COUNT = 5;

  // Filter repos based on search term
  const filteredRepos = allRepos.filter((repo) => {
    debugger;
    if (!searchTerm.trim()) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      repo.full_name.toLowerCase().includes(searchLower) ||
      repo.description?.toLowerCase().includes(searchLower) ||
      repo.language?.toLowerCase().includes(searchLower)
    );
  });

  // Paginate the filtered results
  const totalPages = Math.ceil(filteredRepos.length / MAX_ITEMS_COUNT);
  const startIndex = (currentPage - 1) * MAX_ITEMS_COUNT;
  const endIndex = currentPage * MAX_ITEMS_COUNT;
  const currentPageRepos = filteredRepos.slice(startIndex, endIndex);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  function handlePagination(page: number) {
    setCurrentPage(page);
  }

  function handleSelectRepo(repoId: number | string) {
    setSelectedRepoId((prevRepoId) => (prevRepoId === repoId ? null : repoId));
  }

  // Handle add repositories
  function handleSaveRepositories() {
    const selectedRepoData: ListReposResponse = filteredRepos.filter(
      (repo) => repo.id == selectedRepoId
    );
    if (!user || !user.githubCreds?.access_token) return;
    if (!selectedRepoData.length) return;
    const repoData: RepositoryListItem = selectedRepoData[0];

    mutation.mutate(
      {
        name: repoData.name,
        repo_id: repoData.id,
        full_name: repoData.full_name,
        is_private: repoData.private,
        owner_name: repoData.owner.login,
        default_branch: repoData.default_branch,
        html_url: repoData.html_url,
        clone_url: repoData.clone_url,
        description: repoData.description || "",
        githubId: user?.githubCreds?.id,
        encrypted_token: user?.githubCreds?.access_token,
      },
      {
        onSuccess: () => {
          onRepoAdd();
        },
      }
    );
  }

  return (
    <div className="md:min-w-xl max-w-3xl bg-card p-4 h-auto max-h-[90vh]">
      <h2 className="font-semibold text-lg text-foreground">
        Add Repositories
      </h2>
      <p className="font-normal text-sm text-muted-foreground mt-2 mb-3">
        Browse and connect GitHub repositories to enable automated code reviews.
        Connected repositories are shown with a checkmark.
      </p>

      <InputGroup className="mb-5">
        <InputGroupInput
          placeholder="Search repositories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            className="bg-foreground text-card hover:bg-primary"
            onClick={() => setSearchTerm("")}
          >
            {searchTerm ? "Clear" : "Search"}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>

      {isLoading ? (
        <LoadingState />
      ) : (
        <>
          <div className="flex flex-col justify-start px-2 min-h-[50vh] max-h-[60vh] mb-2 overflow-y-auto">
            {currentPageRepos.length > 0 ? (
              currentPageRepos.map((d) => (
                <RepoList
                  fullName={d.full_name}
                  forksCount={d.forks_count}
                  connected={true}
                  isPrivate={d.private}
                  language={d.language}
                  star={d.stargazers_count}
                  selectedRepoId={selectedRepoId}
                  handleSelectRepo={handleSelectRepo}
                  key={d.id}
                  id={d.id}
                  description={d.description}
                />
              ))
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                No repositories found
              </div>
            )}
          </div>

          {selectedRepoId && (
            <Button
              className="w-full my-2 bg-primary-foreground text-gray-900 hover:bg-primary/60 hover:text-white transition-all delay-50"
              onClick={() => handleSaveRepositories()}
            >
              {mutation.isPending
                ? "Saving Repository..."
                : "+ Add Repositories"}
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
