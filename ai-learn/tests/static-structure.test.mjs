import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('dashboard bootstrap is wired into the existing Level 1 app', () => {
  const app = fs.readFileSync(new URL('../app.js', import.meta.url), 'utf8');
  assert.match(app, /dashboard\.mjs/);
});

test('dashboard module owns the required learning path hooks', () => {
  const source = fs.readFileSync(new URL('../dashboard.mjs', import.meta.url), 'utf8');
  assert.match(source, /learningPath/);
  assert.match(source, /overallProgress/);
});
