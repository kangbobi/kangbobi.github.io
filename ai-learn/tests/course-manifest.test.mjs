import test from 'node:test';
import assert from 'node:assert/strict';
import { COURSE_MANIFEST, flattenModules, findModule } from '../core/course-manifest.mjs';

test('manifest has five unique levels and unique module ids per level', () => {
  assert.equal(COURSE_MANIFEST.length, 5);
  assert.equal(new Set(COURSE_MANIFEST.map(x => x.id)).size, 5);
  for (const level of COURSE_MANIFEST) assert.equal(new Set(level.modules.map(x => x.id)).size, level.modules.length);
});

test('published level 1 paths remain stable', () => {
  assert.equal(findModule('level-1', '01').href, './#module-1');
  assert.equal(findModule('level-1', '08').href, './module-8.html');
});

test('flattenModules returns all modules with parent level id', () => {
  const all = flattenModules(COURSE_MANIFEST);
  assert.ok(all.length > 40);
  assert.ok(all.every(x => x.levelId));
});
