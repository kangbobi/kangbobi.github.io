export const PROGRESS_KEY = 'ai-learn.progress.v2';
export const LEGACY_PROGRESS_KEY = 'ai-learn.progress.v1';

const emptyProgress = () => ({ version: 2, completed: {}, lastVisited: null });

export function normalizeProgress(raw) {
  if (!raw || raw.version !== 2 || typeof raw !== 'object') return emptyProgress();
  const completed = {};
  if (raw.completed && typeof raw.completed === 'object') {
    for (const [levelId, modules] of Object.entries(raw.completed)) {
      if (!Array.isArray(modules)) continue;
      const clean = [...new Set(modules.filter(x => typeof x === 'string' && /^\d{2}$/.test(x)))];
      if (clean.length) completed[levelId] = clean;
    }
  }
  const lastVisited = raw.lastVisited && typeof raw.lastVisited.level === 'string' && typeof raw.lastVisited.module === 'string'
    ? { level: raw.lastVisited.level, module: raw.lastVisited.module }
    : null;
  return { version: 2, completed, lastVisited };
}

export function migrateProgressV1(rawV1) {
  const completed = [];
  if (rawV1 && Array.isArray(rawV1.completed)) {
    for (const value of rawV1.completed) {
      const match = typeof value === 'string' ? value.match(/^module-(\d+)$/) : null;
      if (!match) continue;
      const n = Number(match[1]);
      if (n >= 1 && n <= 8) completed.push(String(n).padStart(2, '0'));
    }
  }
  return { version: 2, completed: completed.length ? { 'level-1': [...new Set(completed)] } : {}, lastVisited: null };
}

export function markCompleted(progress, levelId, moduleId) {
  const next = normalizeProgress(progress);
  const current = next.completed[levelId] ?? [];
  return { ...next, completed: { ...next.completed, [levelId]: [...new Set([...current, moduleId])] } };
}

export function setLastVisited(progress, levelId, moduleId) {
  const next = normalizeProgress(progress);
  return { ...next, lastVisited: { level: levelId, module: moduleId } };
}

export function completionPercent(progress, manifest, levelId = null) {
  const next = normalizeProgress(progress);
  const levels = levelId ? manifest.filter(level => level.id === levelId) : manifest;
  const total = levels.reduce((sum, level) => sum + level.modules.length, 0);
  if (!total) return 0;
  const done = levels.reduce((sum, level) => sum + (next.completed[level.id] ?? []).filter(id => level.modules.some(m => m.id === id)).length, 0);
  return Math.round(done / total * 100);
}

export function readProgress(storage = globalThis.localStorage) {
  if (!storage) return emptyProgress();
  try {
    const v2 = storage.getItem(PROGRESS_KEY);
    if (v2) return normalizeProgress(JSON.parse(v2));
    const legacy = storage.getItem(LEGACY_PROGRESS_KEY);
    const migrated = migrateProgressV1(legacy ? JSON.parse(legacy) : null);
    storage.setItem(PROGRESS_KEY, JSON.stringify(migrated));
    return migrated;
  } catch { return emptyProgress(); }
}

export function writeProgress(progress, storage = globalThis.localStorage) {
  const next = normalizeProgress(progress);
  try { storage?.setItem(PROGRESS_KEY, JSON.stringify(next)); } catch {}
  return next;
}
