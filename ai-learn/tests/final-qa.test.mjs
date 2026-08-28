import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { COURSE_MANIFEST, flattenModules } from '../core/course-manifest.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const all = flattenModules(COURSE_MANIFEST);

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

test('AI Engineer path has exactly five published levels and 58 published modules', () => {
  assert.equal(COURSE_MANIFEST.length, 5);
  assert.equal(all.length, 58);
  assert.ok(COURSE_MANIFEST.every(level => level.status === 'published'));
  assert.ok(all.every(module => module.published === true));
  assert.equal(new Set(all.map(module => `${module.levelId}:${module.id}`)).size, 58);
  assert.equal(new Set(all.map(module => module.href)).size, 58);
});

test('every nested lesson route exists and identifies the expected module', () => {
  for (const module of all.filter(item => item.levelId !== 'level-1')) {
    const relative = module.href.replace(/^\.\//, '');
    const file = path.join(root, relative);
    assert.ok(fs.existsSync(file), `missing ${relative}`);
    const html = fs.readFileSync(file, 'utf8');
    assert.match(html, new RegExp(`data-module=["']${module.id}["']`), `module id mismatch in ${relative}`);
    assert.match(html, /<meta name="viewport"/i, `missing viewport in ${relative}`);
    assert.match(html, /lesson-shell\.css/, `missing shared shell in ${relative}`);
    assert.match(html, /INTERACTIVE LAB/, `missing lab in ${relative}`);
    assert.doesNotMatch(html, /<(?:script|link)[^>]+(?:src|href)=["']https?:/i, `remote runtime dependency in ${relative}`);
  }
});

test('all JavaScript and ES module source parses with Node 22 syntax checker', () => {
  const files = walk(root).filter(file => /\.(?:js|mjs)$/.test(file));
  assert.ok(files.length > 10);
  for (const file of files) {
    const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
    assert.equal(result.status, 0, `${path.relative(root, file)} syntax error:\n${result.stderr}`);
  }
});

test('ES module source does not assign untrusted HTML through innerHTML', () => {
  const modules = walk(root).filter(file => file.endsWith('.mjs'));
  for (const file of modules) {
    const source = fs.readFileSync(file, 'utf8');
    assert.doesNotMatch(source, /\.innerHTML\s*=/, `unsafe innerHTML assignment in ${path.relative(root, file)}`);
  }
});

test('final capstone preserves explicit human approval and simulation boundaries', () => {
  const html = fs.readFileSync(path.join(root, 'level-5', '14-capstone.html'), 'utf8');
  assert.match(html, /human approval/i);
  assert.match(html, /tidak menjalankan perubahan nyata/i);
  const runtime = fs.readFileSync(path.join(root, 'level-5', 'level-5.mjs'), 'utf8');
  assert.match(runtime, /No real action is executed/i);
});

test('legacy Level 1 entry points remain present', () => {
  assert.ok(fs.existsSync(path.join(root, 'index.html')));
  for (let n = 3; n <= 8; n++) assert.ok(fs.existsSync(path.join(root, `module-${n}.html`)));
});
