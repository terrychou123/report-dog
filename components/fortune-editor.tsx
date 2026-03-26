"use client";
import dynamic from "next/dynamic";

const FortuneEditorInner = dynamic(
  () => import("@/components/fortune-editor-inner"),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-[600px] border rounded-lg">
        <span className="text-sm text-muted-foreground">載入編輯器中...</span>
      </div>
    ),
  }
);

export interface FortuneEditorProps {
  reportId: string;
  initialData: unknown;
  title: string;
  saveTrigger?: number;
  downloadTrigger?: number;
  onSavingChange?: (saving: boolean) => void;
  onDownloadingChange?: (downloading: boolean) => void;
  onChanged?: () => void;
  /** Override the save endpoint. Defaults to /api/reports/${reportId} */
  saveUrl?: string;
}

export function FortuneEditor(props: FortuneEditorProps) {
  return <FortuneEditorInner {...props} />;
}
