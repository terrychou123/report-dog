import { TagIcon, LinkIcon } from "lucide-react";
import { FileTypeIcon } from "@/components/file-type-icon";

interface ReportCardContentProps {
  title: string;
  fileType: string | null;
  formattedDate: string;
  tags: string[];
  links?: { name: string; url: string }[];
}

export function ReportCardContent({ title, fileType, formattedDate, tags, links }: ReportCardContentProps) {
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
      {/* 桌面版：標籤 + 連結 */}
      {(tags.length > 0 || (links && links.length > 0)) && (
        <div className="hidden md:flex items-center gap-2 text-xs font-normal text-muted-foreground mt-1 ml-6 flex-wrap">
          {tags.length > 0 && (
            <span className="flex items-center gap-1">
              <TagIcon className="h-3 w-3 shrink-0" />
              <span>{tags.join("、")}</span>
            </span>
          )}
          {links && links.map((link) => (
            <button key={link.url} type="button"
              className="inline-flex items-center gap-1 text-primary hover:underline"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(link.url, "_blank", "noopener,noreferrer"); }}>
              <LinkIcon className="h-3 w-3 shrink-0" />
              {link.name}
            </button>
          ))}
        </div>
      )}
      {/* 手機版：日期 + 標籤 + 連結 */}
      <div className="md:hidden text-xs font-normal text-muted-foreground mt-1 ml-6">
        <p>{formattedDate}</p>
        {tags.length > 0 && (
          <div className="flex items-center gap-1 mt-0.5">
            <TagIcon className="h-3 w-3 shrink-0" />
            <span className="break-words">{tags.join("、")}</span>
          </div>
        )}
        {links && links.length > 0 && (
          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
            {links.map((link) => (
              <button key={link.url} type="button"
                className="inline-flex items-center gap-1 text-primary hover:underline"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(link.url, "_blank", "noopener,noreferrer"); }}>
                <LinkIcon className="h-3 w-3 shrink-0" />
                {link.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
