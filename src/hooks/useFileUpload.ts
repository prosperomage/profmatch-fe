"use client";

import { useState, useCallback } from "react";
import { uploadFile } from "@/lib/api";
import type { UploadResponse } from "@/types";

interface UploadState {
  fileId: string | null;
  progress: number;
  status: "idle" | "uploading" | "success" | "error";
  error: string | null;
}

export function useFileUpload() {
  const [state, setState] = useState<UploadState>({
    fileId: null,
    progress: 0,
    status: "idle",
    error: null,
  });

  const upload = useCallback(
    async (sessionId: string, file: File): Promise<UploadResponse> => {
      setState({
        fileId: null,
        progress: 0,
        status: "uploading",
        error: null,
      });

      try {
        const response = await uploadFile(sessionId, file, (progress) => {
          setState((prev) => ({ ...prev, progress }));
        });

        setState({
          fileId: response.file_id,
          progress: 100,
          status: "success",
          error: null,
        });

        return response;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to upload file";
        setState((prev) => ({
          ...prev,
          status: "error",
          error: message,
        }));
        throw err;
      }
    },
    []
  );

  const reset = useCallback(() => {
    setState({
      fileId: null,
      progress: 0,
      status: "idle",
      error: null,
    });
  }, []);

  return {
    ...state,
    upload,
    reset,
  };
}
