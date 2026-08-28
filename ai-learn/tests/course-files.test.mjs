import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { COURSE_MANIFEST } from '../core/course-manifest.mjs';
import { validatePublishedFiles } from '../core/course-validation.mjs';

test('validator reports missing published files', () => {
  const fake = [{id:'level-x',modules:[{id:'01',href:'./missing.html',published:true}]}];
  assert.deepEqual(validatePublishedFiles(fake, () => false), ['./missing.html']);
});

test('published AI-Learn module files exist in repository', () => {
  const root = path.resolve(new URL('..', import.meta.url).pathname);
  const missing = validatePublishedFiles(COURSE_MANIFEST, href => {
    if (href.includes('#')) return fs.existsSync(path.join(root, 'index.html'));
    return fs.existsSync(path.join(root, href.replace(/^\.\//, '')));
  });
  assert.deepEqual(missing, []);
});
