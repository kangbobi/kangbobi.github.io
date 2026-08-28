import test from 'node:test';
import assert from 'node:assert/strict';
import { migrateProgressV1, normalizeProgress, markCompleted, completionPercent, setLastVisited } from '../core/progress.mjs';
import { COURSE_MANIFEST } from '../core/course-manifest.mjs';

test('migrates valid level 1 completions from v1', () => {
  const next = migrateProgressV1({ completed: ['module-1', 'module-3', 'module-3', 'bad'] });
  assert.deepEqual(next.completed['level-1'], ['01', '03']);
  assert.equal(next.version, 2);
});

test('normalizes corrupt progress safely', () => {
  assert.deepEqual(normalizeProgress(null), { version: 2, completed: {}, lastVisited: null });
  assert.deepEqual(normalizeProgress({version: 2, completed: {'level-2':['01','01',5]}}).completed['level-2'], ['01']);
});

test('markCompleted de-duplicates module ids', () => {
  const p = markCompleted({ version: 2, completed: {}, lastVisited: null }, 'level-2', '01');
  const q = markCompleted(p, 'level-2', '01');
  assert.deepEqual(q.completed['level-2'], ['01']);
});

test('completionPercent calculates overall and per-level progress', () => {
  let p = { version:2, completed:{}, lastVisited:null };
  p = markCompleted(p, 'level-1', '01');
  assert.equal(completionPercent(p, COURSE_MANIFEST, 'level-1'), 13);
  assert.equal(completionPercent(p, COURSE_MANIFEST), 2);
});

test('setLastVisited records current lesson safely', () => {
  const p = setLastVisited({version:2,completed:{},lastVisited:null}, 'level-2', '04');
  assert.deepEqual(p.lastVisited, {level:'level-2',module:'04'});
});
