"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewKindPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("請輸入種類名稱");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/kinds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), description: description.trim() }),
      });

      if (!res.ok) {
        setError("儲存失敗，請重試");
        return;
      }

      const { id } = await res.json();
      router.push(`/kind/${id}`);
    } catch {
      setError("儲存失敗，請重試");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">新增種類</h1>
        <p className="text-muted-foreground mt-1 text-sm">建立新的報告種類以便分類管理</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">種類資料</CardTitle>
          <CardDescription>填寫種類的名稱與說明</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">種類名稱 *</Label>
              <Input
                id="name"
                placeholder="例如：初始評估、追蹤記錄、結案報告"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">簡單描述</Label>
              <Textarea
                id="description"
                placeholder="說明此種類的用途或適用範圍"
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
