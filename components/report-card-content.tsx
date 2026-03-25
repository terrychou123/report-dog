import { TagIcon } from "lucide-react";
import { FileTypeIcon } from "@/components/file-type-icon";

interface ReportCardContentProps {
  title: string;
  fileType: string | null;
  formattedDate: string;
  tags: string[];
}

export function ReportCardContent({ title, fileType, formattedDate, tags }: ReportCardContentProps) {
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <FileTypeIcon fileType={fileType} className="shrink-0" />
          <span className="break-words">{title}</span>
        </div>
        <span className="hidden md:block text-xs font-normal text-muted-foreground whitespace-nowrap shrink-0">
          {formattedDate}
        </span>
      </div>
      {tags.length > 0 && (
        <div className="hidden md:flex items-center gap-1 text-xs font-normal text-muted-foreground mt-1 ml-6">
          <TagIcon className="h-3 w-3 shrink-0" />
          <span>{tags.join("、")}</span>
        </div>
      )}
      <div className="md:hidden text-xs font-normal text-muted-foreground mt-1 ml-6">
        <p>{formattedDate}</p>
        {tags.length > 0 && (
          <div className="flex items-center gap-1 mt-0.5">
            <TagIcon className="h-3 w-3 shrink-0" />
            <span className="break-words">{tags.join("、")}</span>
          </div>
        )}
      </div>
    </>
  );
}
