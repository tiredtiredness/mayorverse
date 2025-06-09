"use client";

import {useQuery} from "@tanstack/react-query";
import {authService} from "@/services/auth.service";
import {TUser} from "@/types/auth.types";

interface UseAuthResult {
  user: TUser | null | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
  isError: boolean;
}

export function useAuth(): UseAuthResult {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery<TUser | null>({
    queryKey: ["profile"],
    queryFn: async () => await authService.getProfile(),
  });

  const isAuthenticated = !!user;

  return {user, isAuthenticated, isLoading, isError};
}
