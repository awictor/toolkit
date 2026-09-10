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
  ['TipSplit', 'https://awictor.github.io/tip-split/'],
  ['LoanCalc', 'https://awictor.github.io/loan-calc/'],
  ['NestEgg', 'https://awictor.github.io/nest-egg/'],
  ['PassForge', 'https://awictor.github.io/pass-forge/'],
  ['Contrast', 'https://awictor.github.io/contrast/'],
  ['CronPal', 'https://awictor.github.io/cron-pal/'],
  ['JWTPeek', 'https://awictor.github.io/jwt-peek/'],
  ['WordCount', 'https://awictor.github.io/word-count/'],
  ['EpochConvert', 'https://awictor.github.io/epoch-convert/'],
  ['ColorConvert', 'https://awictor.github.io/color-convert/'],
  ['CaseKit', 'https://awictor.github.io/case-kit/'],
  ['EncodeKit', 'https://awictor.github.io/encode-kit/'],
  ['UUIDGen', 'https://awictor.github.io/uuid-gen/'],
  ['JSONFormat', 'https://awictor.github.io/json-format/'],
  ['DiffCheck', 'https://awictor.github.io/diff-check/'],
];

let n = 0; const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

for (const [name, url] of tools) {
  check(`links ${name}`, () => {
    assert.ok(html.includes(url), `missing URL ${url}`);
    assert.ok(html.includes('>' + name + '<'), `missing name ${name}`);
  });
}
check('exactly 20 tool cards', () => {
  assert.equal((html.match(/class="card"/g) || []).length, 20);
});
check('tools grouped into category sections', () => {
  assert.equal((html.match(/class="cat"/g) || []).length, 5);
  for (const c of ['Finance', 'Developer', 'Design', 'Security', 'Writing'])
    assert.ok(html.includes('<h3>' + c) || html.includes(c + '</h3>') || new RegExp('<h3>'+c).test(html), 'missing category ' + c);
});
check('valid JSON-LD ItemList with 20 items', () => {
  const m = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert.ok(m, 'no JSON-LD block');
  const data = JSON.parse(m[1]);
  assert.equal(data['@type'], 'ItemList');
  assert.equal(data.itemListElement.length, 20);
  assert.equal(data.itemListElement[0].item.url, tools[0][1]);
});

check('sitemap.xml lists all 20 pages', () => {
  const sm = readFileSync(join(__dirname, '..', 'sitemap.xml'), 'utf8');
  const urls = ['toolkit', ...tools.map(t => t[1])];
  assert.equal((sm.match(/<loc>/g) || []).length, 21);
  assert.ok(sm.includes('https://awictor.github.io/toolkit/'));
  for (const [, url] of tools) assert.ok(sm.includes(url), 'sitemap missing ' + url);
});

// Evaluate the hub script in a minimal DOM stub to exercise the pure filter.
function el(){ return {value:'',textContent:'',style:{},className:'',getAttribute(){return null;},setAttribute(){},addEventListener(){},querySelectorAll(){return[];},onclick:null}; }
globalThis.document={getElementById:()=>el(),querySelectorAll:()=>[],documentElement:el()};
globalThis.localStorage={getItem:()=>null,setItem(){},removeItem(){}};
globalThis.window={matchMedia:()=>({matches:false})};
globalThis.matchMedia=globalThis.window.matchMedia;
const js=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]).sort((a,b)=>b.length-a.length)[0];
eval(js+`\n;globalThis.__t={filterTools};`);
const filterTools=globalThis.__t.filterTools;

check('filterTools: matches name or description, case-insensitive', () => {
  const items=[{name:'MarginMaster',desc:'Amazon FBA true-profit'},{name:'Payoff',desc:'debt snowball'},{name:'NestEgg',desc:'compound interest'}];
  assert.equal(filterTools(items,'').length, 3);
  assert.deepEqual(filterTools(items,'debt').map(i=>i.name), ['Payoff']);
  assert.deepEqual(filterTools(items,'AMAZON').map(i=>i.name), ['MarginMaster']);
  assert.deepEqual(filterTools(items,'interest').map(i=>i.name), ['NestEgg']);
  assert.equal(filterTools(items,'zzz').length, 0);
  assert.equal(filterTools(items,'   ').length, 3); // whitespace-only = no filter
});
check('filterTools: supports a combined text field', () => {
  const items=[{text:'Runway SaaS metrics'},{text:'RateRight freelance'}];
  assert.deepEqual(filterTools(items,'saas'), [items[0]]);
});

console.log(`\n${n} checks passed.`);
