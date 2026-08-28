import { COURSE_MANIFEST } from './course-manifest.mjs';
import { completionPercent, markCompleted, readProgress, setLastVisited, writeProgress } from './progress.mjs';
import { node, safeHref } from './dom.mjs';

export function getLessonNavigation(manifest, levelId, moduleId) {
  const level = manifest.find(item => item.id === levelId);
  if (!level) return { level: null, current: null, previous: null, next: null };
  const index = level.modules.findIndex(item => item.id === moduleId);
  if (index < 0) return { level, current: null, previous: null, next: null };
  return { level, current: level.modules[index], previous: level.modules[index - 1] ?? null, next: level.modules[index + 1] ?? null };
}

export function resolveLessonHref(levelId, href) {
  const prefix = `./${levelId}/`;
  return typeof href === 'string' && href.startsWith(prefix) ? `./${href.slice(prefix.length)}` : href;
}

export function mountLessonShell({ levelId, moduleId, root = document.body } = {}) {
  if (!root || !levelId || !moduleId) return null;
  const nav = getLessonNavigation(COURSE_MANIFEST, levelId, moduleId);
  if (!nav.current) return null;
  let progress = setLastVisited(readProgress(), levelId, moduleId);
  writeProgress(progress);
  const shell = node('aside', { className: 'ai-course-shell', attrs: { 'aria-label': 'Course navigation' } });
  shell.append(node('a', { className: 'ai-course-brand', text: 'AI-Learn', attrs: { href: '../' } }));
  shell.append(node('p', { className: 'ai-course-level', text: nav.level.title }));
  const meter = node('div', { className: 'ai-course-meter' });
  const meterText = node('span', { text: `${completionPercent(progress, COURSE_MANIFEST, levelId)}% level` });
  const track = node('span', { className: 'ai-course-meter-track' });
  const fill = node('span', { className: 'ai-course-meter-fill', attrs: { style: `width:${completionPercent(progress, COURSE_MANIFEST, levelId)}%` } });
  track.append(fill); meter.append(meterText, track); shell.append(meter);
  const list = node('nav', { className: 'ai-course-module-list' });
  for (const item of nav.level.modules) {
    const link = node('a', { text: `${item.id} · ${item.title}`, attrs: { href: safeHref(resolveLessonHref(levelId, item.href)), 'aria-current': item.id === moduleId ? 'page' : null } });
    if (item.id === moduleId) link.classList.add('current');
    list.append(link);
  }
  shell.append(list);
  const controls = node('div', { className: 'ai-course-prevnext' });
  if (nav.previous) controls.append(node('a', { text: `← ${nav.previous.title}`, attrs: { href: safeHref(resolveLessonHref(levelId, nav.previous.href)) } }));
  if (nav.next) controls.append(node('a', { text: `${nav.next.title} →`, attrs: { href: safeHref(resolveLessonHref(levelId, nav.next.href)) } }));
  shell.append(controls);
  const done = node('button', { className: 'ai-course-complete', text: '✓ Tandai module selesai', attrs: { type: 'button' } });
  done.addEventListener('click', () => {
    progress = markCompleted(readProgress(), levelId, moduleId); writeProgress(progress);
    done.textContent = '✓ Module selesai'; done.classList.add('done');
    const pct = completionPercent(progress, COURSE_MANIFEST, levelId); meterText.textContent = `${pct}% level`; fill.style.width = `${pct}%`;
  });
  if ((progress.completed[levelId] ?? []).includes(moduleId)) { done.textContent = '✓ Module selesai'; done.classList.add('done'); }
  shell.append(done); root.prepend(shell); return shell;
}
