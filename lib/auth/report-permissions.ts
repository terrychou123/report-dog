import { db } from "@/db";
import { reports, clients, clientReports } from "@/db/schema";
import { eq, and, or, sql } from "drizzle-orm";

/** 使用者是否可讀取此報告（擁有者 or 標籤 viewer/editor） */
export async function canAccessReport(reportId: string, userId: string): Promise<boolean> {
  const [report] = await db
    .select({ userId: reports.userId })
    .from(reports)
    .where(eq(reports.id, reportId));
  if (!report) return false;
  if (report.userId === userId) return true;

  const [sharedTag] = await db
    .select({ id: clients.id })
    .from(clientReports)
    .innerJoin(clients, eq(clientReports.clientId, clients.id))
    .where(
      and(
        eq(clientReports.reportId, reportId),
        or(
          sql`${userId} = ANY(${clients.viewers})`,
          sql`${userId} = ANY(${clients.editors})`
        )
      )
    );
  return !!sharedTag;
}

/** 使用者是否可編輯此報告（擁有者 or 標籤 editor） */
export async function canEditReport(reportId: string, userId: string): Promise<boolean> {
  const [report] = await db
    .select({ userId: reports.userId })
    .from(reports)
    .where(eq(reports.id, reportId));
  if (!report) return false;
  if (report.userId === userId) return true;

  const [editableTag] = await db
    .select({ id: clients.id })
    .from(clientReports)
    .innerJoin(clients, eq(clientReports.clientId, clients.id))
    .where(
      and(
        eq(clientReports.reportId, reportId),
        sql`${userId} = ANY(${clients.editors})`
      )
    );
  return !!editableTag;
}
