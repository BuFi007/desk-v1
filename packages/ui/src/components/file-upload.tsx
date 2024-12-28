import * as React from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "../utils";
import { Button } from "./button";
import { Upload, X } from "lucide-react";
import Image from "next/image";

interface FileUploadProps {
  accept?: string;
  maxSize?: number;
  value?: File;
  onChange?: (file: File | null) => void;
  preview?: boolean;
  className?: string;
}

export function FileUpload({
  accept = "image/*",
  maxSize = 5 * 1024 * 1024, // 5MB
  value,
  onChange,
  preview = true,
  className,
  ...props
}: FileUploadProps) {
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (value && preview) {
      const url = URL.createObjectURL(value);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [value, preview]);

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file && onChange) {
        onChange(file);
      }
    },
    [onChange]
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
  };

  return (
    <div
      {...getRootProps()}
      className={cn(
        "relative flex flex-col items-center justify-center rounded-full border-2 border-dashed p-6 transition-colors",
        isDragActive ? "border-primary bg-muted" : "border-muted-foreground/25",
        className
      )}
      {...props}
    >
      <input {...getInputProps()} />

      {previewUrl && preview ? (
        <div className="relative h-24 w-24 rounded-full overflow-hidden">
          <Image src={previewUrl} alt="Preview" fill className="object-cover" />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-0 right-0 h-6 w-6"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <Upload className="h-8 w-8 text-muted-foreground" />
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Drag & drop or click to upload
            </p>
            <p className="text-xs text-muted-foreground">
              Max file size: {Math.floor(maxSize / 1024 / 1024)}MB
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
