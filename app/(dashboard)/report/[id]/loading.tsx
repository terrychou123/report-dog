import { Skeleton } from "@/components/ui/skeleton";

export default function ReportDetailLoading() {
  return (
    <div className="flex flex-col gap-4 p-6">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-[60vh] w-full rounded-lg" />
    </div>
  );
}
