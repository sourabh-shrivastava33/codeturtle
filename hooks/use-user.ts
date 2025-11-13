"use client";
import { fetchUserData, getUserGithubData } from "@/lib/actions/user";
import { useQuery } from "@tanstack/react-query";

export function useFetchusersData() {
  const user = useQuery({
    queryKey: ["user_data"],
    queryFn: fetchUserData,
  });
  return user;
}

export function useGetUserGithubData() {
  const data = useQuery({
    queryKey: ["github_data"],
    queryFn: getUserGithubData,
  });
  return data;
}
