// Link-integrity test for the Toolkit hub: every tool must be present and linked.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

const tools = [
  ['MarginMaster', 'https://awictor.github.io/margin-master/'],
  ['Runway', 'https://awictor.github.io/runway-calc/'],
  ['RateRight', 'https://awictor.github.io/rate-right/'],
  ['Payoff', 'https://awictor.github.io/payoff/'],
  ['BreakEven', 'https://awictor.github.io/breakeven/'],
];

let n = 0; const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

for (const [name, url] of tools) {
  check(`links ${name}`, () => {
    assert.ok(html.includes(url), `missing URL ${url}`);
    assert.ok(html.includes('>' + name + '<'), `missing name ${name}`);
  });
}
check('exactly 5 tool cards', () => {
  assert.equal((html.match(/class="card"/g) || []).length, 5);
});
check('valid JSON-LD ItemList with 5 items', () => {
  const m = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert.ok(m, 'no JSON-LD block');
  const data = JSON.parse(m[1]);
  assert.equal(data['@type'], 'ItemList');
  assert.equal(data.itemListElement.length, 5);
  assert.equal(data.itemListElement[0].item.url, tools[0][1]);
});

check('sitemap.xml lists all 6 pages', () => {
  const sm = readFileSync(join(__dirname, '..', 'sitemap.xml'), 'utf8');
  const urls = ['toolkit', ...tools.map(t => t[1])];
  assert.equal((sm.match(/<loc>/g) || []).length, 6);
  assert.ok(sm.includes('https://awictor.github.io/toolkit/'));
  for (const [, url] of tools) assert.ok(sm.includes(url), 'sitemap missing ' + url);
});

console.log(`\n${n} checks passed.`);
