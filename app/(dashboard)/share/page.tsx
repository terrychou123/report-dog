import { SharedReportsList } from "@/components/shared-reports-list";

export default function SharePage() {
  return (
    <div className="p-4 md:p-8 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">與我分享</h1>
        <p className="text-muted-foreground mt-1 text-sm">其他人與您分享的報告</p>
      </div>
      <SharedReportsList />
    </div>
  );
}
