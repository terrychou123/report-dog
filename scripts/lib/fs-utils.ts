import * as fs from 'fs';

/** 確保目錄存在，不存在時遞迴建立 */
export function ensureDir(dir: string): void {
  fs.mkdirSync(dir, { recursive: true });
}

/** 回傳今天日期字串（YYYY-MM-DD） */
export function today(): string {
  return new Date().toISOString().split('T')[0];
}
