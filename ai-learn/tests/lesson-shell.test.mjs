import test from 'node:test';
import assert from 'node:assert/strict';
import { getLessonNavigation, resolveLessonHref } from '../core/lesson-shell.mjs';
import { COURSE_MANIFEST } from '../core/course-manifest.mjs';

test('navigation resolves previous and next within a level', () => {
  const nav = getLessonNavigation(COURSE_MANIFEST, 'level-2', '02');
  assert.equal(nav.previous.id, '01');
  assert.equal(nav.next.id, '03');
  assert.equal(nav.current.id, '02');
});

test('first and last lesson expose null outer neighbors', () => {
  assert.equal(getLessonNavigation(COURSE_MANIFEST, 'level-2', '01').previous, null);
  assert.equal(getLessonNavigation(COURSE_MANIFEST, 'level-2', '10').next, null);
});

test('nested lesson routes resolve manifest href inside their own level directory', () => {
  assert.equal(resolveLessonHref('level-2', './level-2/03-forward-pass.html'), './03-forward-pass.html');
  assert.equal(resolveLessonHref('level-3', './level-3/01-language-modeling.html'), './01-language-modeling.html');
  assert.equal(resolveLessonHref('level-2', './module-3.html'), './module-3.html');
});
