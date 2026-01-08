import type {
  SessionResponse,
  UploadResponse,
  MatchStatus,
  MatchResultsResponse,
  ProfessorProfile,
} from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new ApiError(response.status, errorText || response.statusText);
  }

  return response.json();
}

// Health check
export async function healthCheck(): Promise<{ status: string }> {
  return fetchApi<{ status: string }>("/health");
}

// Session endpoints
export async function createSession(): Promise<SessionResponse> {
  return fetchApi<SessionResponse>("/api/session", {
    method: "POST",
  });
}

export async function getSession(sessionId: string): Promise<SessionResponse> {
  return fetchApi<SessionResponse>(`/api/session/${sessionId}`);
}

export async function deleteSession(sessionId: string): Promise<void> {
  await fetchApi(`/api/session/${sessionId}`, {
    method: "DELETE",
  });
}

// Upload endpoints
export async function uploadFile(
  sessionId: string,
  file: File,
  onProgress?: (progress: number) => void
): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("session_id", sessionId);

  const xhr = new XMLHttpRequest();

  return new Promise((resolve, reject) => {
    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable && onProgress) {
        const progress = Math.round((event.loaded / event.total) * 100);
        onProgress(progress);
      }
    });

    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(new ApiError(xhr.status, xhr.statusText));
      }
    });

    xhr.addEventListener("error", () => {
      reject(new ApiError(0, "Network error"));
    });

    xhr.open("POST", `${API_BASE_URL}/api/upload`);
    xhr.send(formData);
  });
}

// Match endpoints
export async function startMatch(
  sessionId: string,
  university: string,
  researchInterests: string[],
  fileIds: string[]
): Promise<{ match_id: string }> {
  return fetchApi<{ match_id: string }>("/api/match", {
    method: "POST",
    body: JSON.stringify({
      session_id: sessionId,
      university,
      research_interests: researchInterests,
      file_ids: fileIds,
    }),
  });
}

export async function getMatchStatus(
  matchId: string,
  sessionId: string
): Promise<MatchStatus> {
  return fetchApi<MatchStatus>(
    `/api/match/${matchId}/status?session_id=${sessionId}`
  );
}

export async function getMatchResults(
  matchId: string,
  sessionId: string
): Promise<MatchResultsResponse> {
  return fetchApi<MatchResultsResponse>(
    `/api/match/${matchId}/results?session_id=${sessionId}`
  );
}

// Professor endpoints
export async function getProfessor(
  professorId: string
): Promise<ProfessorProfile> {
  return fetchApi<ProfessorProfile>(`/api/professor/${professorId}`);
}

export { ApiError };