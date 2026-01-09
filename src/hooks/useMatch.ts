"use client";

import { useState, useCallback, useRef } from "react";
import { startMatch, getMatchStatus, getMatchResults } from "@/lib/api";
import type { MatchStatus, MatchResultsResponse } from "@/types";

const POLL_INTERVAL = 2000;

export function useMatch() {
  const [matchId, setMatchId] = useState<string | null>(null);
  const [status, setStatus] = useState<MatchStatus | null>(null);
  const [results, setResults] = useState<MatchResultsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const pollRef = useRef<NodeJS.Timeout | null>(null);

  const stopPolling = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  const start = useCallback(
    async (
      sessionId: string,
      university: string,
      researchInterests: string[],
      fileIds: string[]
    ) => {
      setError(null);
      setStatus(null);
      setResults(null);

      try {
        const response = await startMatch(
          sessionId,
          university,
          researchInterests,
          fileIds
        );
        setMatchId(response.match_id);
        return response.match_id;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to start matching";
        setError(message);
        throw err;
      }
    },
    []
  );

  const pollStatus = useCallback(
    async (id: string, sessionId: string): Promise<MatchResultsResponse> => {
      return new Promise((resolve, reject) => {
        const poll = async () => {
          try {
            const statusResponse = await getMatchStatus(id, sessionId);
            setStatus(statusResponse);

            if (statusResponse.status === "completed") {
              stopPolling();
              const resultsResponse = await getMatchResults(id, sessionId);
              setResults(resultsResponse);
              resolve(resultsResponse);
            } else if (statusResponse.status === "failed") {
              stopPolling();
              const errorMessage = statusResponse.error || "Matching failed";
              setError(errorMessage);
              reject(new Error(errorMessage));
            }
          } catch (err) {
            stopPolling();
            const message =
              err instanceof Error ? err.message : "Failed to get status";
            setError(message);
            reject(err);
          }
        };

        poll();
        pollRef.current = setInterval(poll, POLL_INTERVAL);
      });
    },
    [stopPolling]
  );

  const reset = useCallback(() => {
    stopPolling();
    setMatchId(null);
    setStatus(null);
    setResults(null);
    setError(null);
  }, [stopPolling]);

  return {
    matchId,
    status,
    results,
    error,
    start,
    pollStatus,
    reset,
    stopPolling,
  };
}
