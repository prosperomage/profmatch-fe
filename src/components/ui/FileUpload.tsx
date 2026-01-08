"use client";

import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { validateFileType, validateFileSize, formatFileSize } from "@/lib/utils";

export interface UploadedFile {
  file: File;
  id: string;
}

export interface FileUploadProps {
  label?: string;
  accept?: string;
  maxSizeMB?: number;
  multiple?: boolean;
  value?: UploadedFile[];
  onChange?: (files: UploadedFile[]) => void;
  error?: string;
  disabled?: boolean;
}

export function FileUpload({
  label,
  accept = ".pdf,.docx,.txt",
  maxSizeMB = 10,
  multiple = false,
  value = [],
  onChange,
  error,
  disabled = false,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList || disabled) return;

      setFileError(null);
      const newFiles: UploadedFile[] = [];

      for (const file of Array.from(fileList)) {
        if (!validateFileType(file)) {
          setFileError("Only PDF, DOCX, and TXT files are allowed");
          continue;
        }

        if (!validateFileSize(file, maxSizeMB)) {
          setFileError(`File size must be less than ${maxSizeMB}MB`);
          continue;
        }

        newFiles.push({
          file,
          id: `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        });
      }

      if (newFiles.length > 0) {
        const updatedFiles = multiple ? [...value, ...newFiles] : newFiles;
        onChange?.(updatedFiles);
      }
    },
    [disabled, maxSizeMB, multiple, onChange, value]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (!disabled) setIsDragging(true);
    },
    [disabled]
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFiles(e.target.files);
      e.target.value = "";
    },
    [handleFiles]
  );

  const removeFile = useCallback(
    (id: string) => {
      onChange?.(value.filter((f) => f.id !== id));
    },
    [onChange, value]
  );

  const displayError = error || fileError;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <span className="text-sm font-medium text-text-primary">{label}</span>
      )}

      <label
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "flex min-h-[120px] cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed border-border bg-background p-6",
          "transition-colors duration-150",
          "hover:border-secondary-light hover:bg-surface",
          isDragging && "border-primary bg-surface",
          disabled && "cursor-not-allowed opacity-50",
          displayError && "border-error"
        )}
      >
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          disabled={disabled}
          className="sr-only"
          aria-describedby={displayError ? "file-upload-error" : undefined}
        />

        <svg
          className="h-8 w-8 text-text-muted"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>

        <div className="text-center">
          <span className="text-sm font-medium text-primary">
            Drop your resume here
          </span>
          <span className="text-sm text-text-secondary"> or click to browse</span>
        </div>

        <p className="text-xs text-text-muted">
          PDF, DOCX, or TXT (max {maxSizeMB}MB)
        </p>
      </label>

      {displayError && (
        <p id="file-upload-error" className="text-sm text-error" role="alert">
          {displayError}
        </p>
      )}

      {value.length > 0 && (
        <ul className="mt-2 space-y-2">
          {value.map(({ file, id }) => (
            <li
              key={id}
              className="flex items-center justify-between rounded-md border border-border bg-surface px-3 py-2"
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <svg
                  className="h-4 w-4 shrink-0 text-text-secondary"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span className="truncate text-sm text-text-primary">
                  {file.name}
                </span>
                <span className="shrink-0 text-xs text-text-muted">
                  ({formatFileSize(file.size)})
                </span>
              </div>

              <button
                type="button"
                onClick={() => removeFile(id)}
                className="ml-2 shrink-0 p-1 text-text-muted transition-colors hover:text-error"
                aria-label={`Remove ${file.name}`}
              >
                <svg
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}