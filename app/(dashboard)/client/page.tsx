import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { clients } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PlusIcon, UserIcon } from "lucide-react";

async function ClientsList() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const userId = data!.claims!.sub;

  const clientList = await db
    .select()
    .from(clients)
    .where(eq(clients.userId, userId))
    .orderBy(desc(clients.createdAt));

  if (clientList.length === 0) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        <UserIcon className="h-12 w-12 mx-auto mb-4 opacity-30" />
        <p className="text-lg mb-2">尚無服務對象</p>
        <p className="text-sm mb-6">點擊「新建對象」開始建立您的第一個服務對象</p>
        <Button asChild variant="outline">
          <Link href="/client/new">
            <PlusIcon className="h-4 w-4 mr-2" />
            新建對象
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {clientList.map((client) => (
        <Link key={client.id} href={`/client/${client.id}`}>
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <UserIcon className="h-4 w-4 text-primary" />
                {client.nickname}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {client.description || "尚無描述"}
              </p>
              <p className="text-xs text-muted-foreground mt-3">
                建立於 {new Date(client.createdAt).toLocaleDateString("zh-TW")}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

function ClientsListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-28 w-full rounded-lg" />
      ))}
    </div>
  );
}

export default function ClientsPage() {
  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">服務對象</h1>
          <p className="text-muted-foreground mt-1 text-sm">管理您的服務對象</p>
        </div>
        <Button asChild>
          <Link href="/client/new">
            <PlusIcon className="h-4 w-4 mr-2" />
            新建對象
          </Link>
        </Button>
      </div>
      <Suspense fallback={<ClientsListSkeleton />}>
        <ClientsList />
      </Suspense>
    </div>
  );
}
