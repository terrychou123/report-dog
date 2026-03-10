interface FileTypeIconProps {
  fileType: string | null;
  className?: string;
}

export function FileTypeIcon({ fileType, className }: FileTypeIconProps) {
  const isExcel = fileType === "excel";
  return (
    <span
      className={`inline-flex items-center justify-center h-4 w-4 rounded-sm text-[9px] font-bold text-white flex-shrink-0 ${
        isExcel ? "bg-green-600" : "bg-blue-600"
      } ${className ?? ""}`}
    >
      {isExcel ? "E" : "W"}
    </span>
  );
}
