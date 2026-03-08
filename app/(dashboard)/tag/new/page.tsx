"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ShieldIcon } from "lucide-react";

export default function NewTagPage() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim()) {
      setError("請輸入暱稱");
      return;
    }
    setLoading(true);
    setError("");

    const res = await fetch("/api/tags", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nickname: nickname.trim(), description: description.trim() }),
    });

    if (!res.ok) {
      setError("儲存失敗，請重試");
      setLoading(false);
      return;
    }

    const { id } = await res.json();
    router.push(`/tag/${id}`);
  };

  return (
    <div className="p-8 max-w-xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">創建新標籤</h1>
        <p className="text-muted-foreground mt-1 text-sm">請使用化名避免個資洩漏</p>
      </div>

      <Alert className="mb-6 border-amber-200 bg-amber-50 dark:bg-amber-950/20">
        <ShieldIcon className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800 dark:text-amber-200 text-sm">
          為保護個案隱私，建議使用化名（例如：小明、案主A）而非真實姓名。
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">標籤資料</CardTitle>
          <CardDescription>填寫標籤的基本資料</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="nickname">暱稱 *</Label>
              <Input
                id="nickname"
                placeholder="例如：小明、案主A"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">簡單描述</Label>
              <Textarea
                id="description"
                placeholder="簡短說明此標籤的背景或情況（可使用代稱）"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={loading}
                rows={3}
              />
            </div>
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={loading}>
                {loading ? "儲存中..." : "儲存"}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()} disabled={loading}>
                取消
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
