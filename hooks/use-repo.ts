"use client";
import {
  fetchAllRepositories,
  saveRepositories,
} from "@/lib/actions/repositories";
import { RepositoriesCreate } from "@/lib/types/repositories";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useSaveRepo(githubId?: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (repoData: RepositoriesCreate) => saveRepositories(repoData),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repo", githubId] });
    },
  });
}

export function useFetchAllRepo(githubId?: string) {
  const allRepo = useQuery({
    queryKey: ["repo", githubId],
    queryFn: ({ queryKey }) => {
      const [_, id] = queryKey;
      return fetchAllRepositories(id!);
    },
  });
  return allRepo;
}
