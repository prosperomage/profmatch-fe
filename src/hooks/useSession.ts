"use client";

import { useState, useCallback } from "react";
import { createSession, deleteSession } from "@/lib/api";
import type { SessionResponse } from "@/types";

export function useSession() {
  const [session, setSession] = useState<SessionResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await createSession();
      setSession(response);
      return response;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to create session";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const remove = useCallback(async () => {
    if (!session) return;

    try {
      await deleteSession(session.session_id);
      setSession(null);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to delete session";
      setError(message);
    }
  }, [session]);

  return {
    session,
    isLoading,
    error,
    create,
    remove,
  };
}
