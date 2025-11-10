import { fetchAllPrs } from "@/lib/actions/repositories";
import { useQuery } from "@tanstack/react-query";

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
