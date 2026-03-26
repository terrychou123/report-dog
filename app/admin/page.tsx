import { db } from "@/db";
import { templateTags, reportTemplates } from "@/db/schema";
import { count } from "drizzle-orm";
import { getAllProfiles } from "@/lib/ai/evaluation-profiles";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const ADMIN_NAV_LABELS: Record<string, string> = {
  "home-care":            "居家長照機構",
  "daycare":              "日間照顧中心",
  "nursing-home":         "住宿型照顧機構",
  "home-nursing":         "居家護理所",
  "general-nursing-home": "一般護理之家",
  "babycare":             "產後護理之家",
  "hospital":             "醫院評鑑",
  "disability":           "身心障礙福利機構",
};

export default async function AdminPage() {
  const profiles = getAllProfiles();

  const [tagCounts, reportCounts] = await Promise.all([
    db.select({ facilityType: templateTags.facilityType, total: count() })
      .from(templateTags)
      .groupBy(templateTags.facilityType),
    db.select({ facilityType: reportTemplates.facilityType, total: count() })
      .from(reportTemplates)
      .groupBy(reportTemplates.facilityType),
  ]);

  const tagMap = Object.fromEntries(tagCounts.map((r) => [r.facilityType, Number(r.total)]));
  const reportMap = Object.fromEntries(reportCounts.map((r) => [r.facilityType, Number(r.total)]));

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">評鑑範本管理</h1>
        <p className="text-muted-foreground mt-1">管理各機構類型的評鑑標籤與範本</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {profiles.map((p) => {
          const tags = tagMap[p.id] ?? 0;
          const reports = reportMap[p.id] ?? 0;
          const displayLabel = ADMIN_NAV_LABELS[p.id] ?? p.label;
          return (
            <Link key={p.id} href={`/admin/${p.id}`}>
              <Card className="hover:border-primary/50 hover:shadow-sm transition-all cursor-pointer h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{displayLabel}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-xs text-muted-foreground">{p.description}</p>
                  <div className="flex gap-2 flex-wrap pt-1">
                    <Badge variant="outline" className="text-xs">
                      {tags} 個標籤
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {reports} 份範本
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
