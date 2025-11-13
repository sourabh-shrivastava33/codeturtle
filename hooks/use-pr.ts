import { createPr } from "@/lib/actions/github/pr";
import { fetchAllPrs } from "@/lib/actions/repositories";
import { PullRequestListItem } from "@/lib/types/pr";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useFetchAllPRs(
  githubId?: string,
  options?: { enabled: boolean }
) {
  return useQuery({
    queryKey: ["pr", githubId],
    queryFn: ({ queryKey }) => {
      const [, id] = queryKey;
      return fetchAllPrs(id!);
    },
    ...options,
  });
}

export function useCreatePr() {
  return useMutation({
    mutationFn: ({
      data,
      repoId,
    }: {
      data: PullRequestListItem;
      repoId: string;
    }) => createPr(data, repoId),
  });
}
