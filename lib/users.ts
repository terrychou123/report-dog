export async function resolveUserEmails(userIds: string[]): Promise<Record<string, string>> {
  const unique = [...new Set(userIds)].filter(Boolean);
  if (unique.length === 0) return {};
  const res = await fetch("/api/users/resolve", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userIds: unique }),
  });
  if (!res.ok) return {};
  return res.json();
}
