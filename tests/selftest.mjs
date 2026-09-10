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
];

let n = 0; const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

for (const [name, url] of tools) {
  check(`links ${name}`, () => {
    assert.ok(html.includes(url), `missing URL ${url}`);
    assert.ok(html.includes('>' + name + '<'), `missing name ${name}`);
  });
}
check('exactly 4 tool cards', () => {
  assert.equal((html.match(/class="card"/g) || []).length, 4);
});

console.log(`\n${n} checks passed.`);
