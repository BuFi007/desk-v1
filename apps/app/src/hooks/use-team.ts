"use client";

import {
  getPrimaryTeam,
  getUser,
  getUserTeams,
} from "@bu/supabase/cached-queries";
import { useCallback } from "react";
import useSWR from "swr";

export function useUser() {
  return useSWR("user", () => getUser());
}

export function useUserTeams() {
  const { data: user } = useUser();
  const userId = user?.data?.id;

  const fetcher = useCallback(async () => {
    if (!userId) return null;
    return getUserTeams(userId);
  }, [userId]);

  return useSWR(userId ? ["userTeams", userId] : null, fetcher, {
    revalidateOnFocus: false,
  });
}

export function usePrimaryTeam() {
  const { data: user } = useUser();
  const userId = user?.data?.id;

  const fetcher = useCallback(async () => {
    if (!userId) return null;
    return getPrimaryTeam(userId);
  }, [userId]);

  return useSWR(userId ? ["primaryTeam", userId] : null, fetcher, {
    revalidateOnFocus: false,
  });
}
