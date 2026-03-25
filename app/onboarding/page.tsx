"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckIcon, ArrowRightIcon, Loader2Icon, Building2Icon } from "lucide-react";
import { toast } from "sonner";
import type { FacilityTemplate } from "@/lib/types/templates";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [templates, setTemplates] = useState<FacilityTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [importing, setImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);

  useEffect(() => {
    fetch("/api/templates")
      .then((r) => r.json())
      .then((data) => setTemplates(data))
      .catch(() => toast.error("載入範本資料失敗"))
      .finally(() => setLoading(false));
  }, []);

  function toggleSelect(facilityType: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(facilityType)) next.delete(facilityType);
      else next.add(facilityType);
      return next;
    });
  }

  async function handleImport() {
    const types = Array.from(selected);
    if (types.length === 0) {
      router.push("/tag");
      return;
    }
    setImporting(true);
    setImportProgress(0);

    let totalTags = 0;
    let totalReports = 0;
    let failed = 0;

    for (let i = 0; i < types.length; i++) {
      const facilityType = types[i];
      try {
        const res = await fetch("/api/templates/import", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ facilityType }),
        });
        if (res.ok) {
          const data = await res.json();
          totalTags += data.tagCount;
          totalReports += data.reportCount;
        } else {
          failed++;
        }
      } catch {
        failed++;
      }
      setImportProgress(i + 1);
    }

    if (failed > 0) {
      toast.warning(`${failed} 個機構類型匯入失敗，其餘已成功匯入`);
    } else {
      toast.success(`匯入完成！已建立 ${totalTags} 個標籤、${totalReports} 份報告`);
    }
    // Signal to tag page to show onboarding guide
    if (typeof window !== "undefined") {
      localStorage.setItem("onboarding_completed", "true");
    }
    router.push("/tag");
  }

  const availableTemplates = templates.filter((t) => t.tagCount > 0);
  const selectedTemplates = templates.filter((t) => selected.has(t.facilityType));
  const totalSelectedTags = selectedTemplates.reduce((s, t) => s + t.tagCount, 0);
  const totalSelectedReports = selectedTemplates.reduce((s, t) => s + t.reportCount, 0);

  return (
    <div className="w-full max-w-2xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
          <Building2Icon className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-2xl font-bold">歡迎使用報告汪</h1>
        <p className="text-muted-foreground mt-2">
          {step === 1
            ? "選擇您服務的機構類型，我們將為您準備好評鑑範本"
            : "確認匯入以下機構類型的評鑑範本"}
        </p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <div className={`w-2 h-2 rounded-full ${step === 1 ? "bg-primary" : "bg-muted"}`} />
        <div className={`w-2 h-2 rounded-full ${step === 2 ? "bg-primary" : "bg-muted"}`} />
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2Icon className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : step === 1 ? (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-3">
            {availableTemplates.map((t) => {
              const isSelected = selected.has(t.facilityType);
              return (
                <button
                  key={t.facilityType}
                  type="button"
                  onClick={() => toggleSelect(t.facilityType)}
                  className={[
                    "text-left rounded-lg border p-4 transition-all",
                    isSelected
                      ? "border-primary ring-2 ring-primary ring-offset-1 bg-primary/5"
                      : "hover:border-primary/50 hover:shadow-sm",
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-medium text-sm">{t.label}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {t.tagCount} 個標籤・{t.reportCount} 份報告
                      </p>
                    </div>
                    {isSelected && (
                      <div className="shrink-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center mt-0.5">
                        <CheckIcon className="h-3 w-3 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-between items-center pt-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground"
              onClick={() => router.push("/tag")}
            >
              跳過，稍後再說
            </Button>
            <Button
              onClick={() => (selected.size > 0 ? setStep(2) : router.push("/tag"))}
              disabled={selected.size === 0}
            >
              下一步
              <ArrowRightIcon className="h-4 w-4 ml-1.5" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="border rounded-lg divide-y">
            {selectedTemplates.map((t) => (
              <div key={t.facilityType} className="flex items-center justify-between px-4 py-3">
                <span className="font-medium text-sm">{t.label}</span>
                <span className="text-xs text-muted-foreground">
                  {t.tagCount} 個標籤・{t.reportCount} 份報告
                </span>
              </div>
            ))}
          </div>

          <div className="bg-muted/50 rounded-lg px-4 py-3 text-sm">
            合計將建立{" "}
            <span className="font-semibold text-foreground">{totalSelectedTags}</span> 個標籤、
            <span className="font-semibold text-foreground">{totalSelectedReports}</span> 份報告範本
          </div>

          {importing && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>匯入中...</span>
                <span>{importProgress} / {selected.size}</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${(importProgress / selected.size) * 100}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex justify-between items-center pt-2">
            <Button variant="outline" onClick={() => setStep(1)} disabled={importing}>
              返回
            </Button>
            <Button onClick={handleImport} disabled={importing}>
              {importing ? (
                <>
                  <Loader2Icon className="h-4 w-4 mr-1.5 animate-spin" />
                  匯入中...
                </>
              ) : "一鍵匯入"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
