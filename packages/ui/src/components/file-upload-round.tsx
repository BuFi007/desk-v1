"use client";

import * as React from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "../utils";
import { Button } from "./button";
import { Upload, X, AlertCircle } from "lucide-react";
import Image from "next/image";

interface FileUploadProps {
  accept?: string;
  maxSize?: number;
  value?: File;
  onChange?: (file: File | null) => void;
  preview?: boolean;
  className?: string;
}

export function FileUploadRound({
  accept = "image/*",
  maxSize = 5 * 1024 * 1024, // 5MB
  value,
  onChange,
  preview = true,
  className,
  ...props
}: FileUploadProps) {
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (value && preview) {
      const url = URL.createObjectURL(value);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [value, preview]);

  const onDrop = React.useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      setError(null);
      const file = acceptedFiles[0];

      // Check for rejected files (size or type)
      if (rejectedFiles.length > 0) {
        const rejection = rejectedFiles[0];
        if (rejection.errors.some((e: any) => e.code === "file-too-large")) {
          // Format file size nicely
          const fileSize = (rejection.file.size / 1024 / 1024).toFixed(2);
          const maxSizeMB = (maxSize / 1024 / 1024).toFixed(2);

          setError(`File too large: ${fileSize}MB (Max: ${maxSizeMB}MB)
File type: ${rejection.file.type || "Unknown"}
File name: ${rejection.file.name}`);
        } else if (
          rejection.errors.some((e: any) => e.code === "file-invalid-type")
        ) {
          setError(`Invalid file type: ${rejection.file.type}`);
        }
        return;
      }

      if (file && onChange) {
        onChange(file);
      }
    },
    [onChange, maxSize],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept ? { [accept]: [] } : undefined,
    maxSize,
    multiple: false,
  });

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onChange) {
      onChange(null);
    }
    setPreviewUrl(null);
    setError(null);
  };

  return (
    <div className="flex items-center justify-center w-full h-full p-6">
      <div
        {...getRootProps()}
        className={cn(
          "relative flex flex-col items-center justify-center w-40 h-40 rounded-full border-2 border-dashed transition-colors aspect-square",
          isDragActive
            ? "border-primary bg-muted"
            : error
              ? "border-destructive"
              : "border-muted-foreground/25",
          className,
        )}
        {...props}
      >
        <input {...getInputProps()} />

        {error ? (
          <div className="flex flex-col items-center justify-center gap-1.5 w-full h-full text-center px-2">
            <AlertCircle className="h-6 w-6 text-destructive" />
            <p className="text-xs text-destructive whitespace-pre-wrap">
              {error}
            </p>
          </div>
        ) : previewUrl && preview ? (
          <div className="relative w-full h-full rounded-full overflow-hidden">
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className="object-cover"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-6 w-6 rounded-full"
              onClick={handleRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-1.5 w-full h-full">
            <Upload className="h-6 w-6 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">Upload</p>
            <p className="text-xs text-muted-foreground/75">
              {Math.floor(maxSize / 1024 / 1024)}MB max
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
