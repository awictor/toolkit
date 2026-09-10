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
  ['LoremGen', 'https://awictor.github.io/lorem-gen/'],
  ['HashGen', 'https://awictor.github.io/hash-gen/'],
  ['BaseConvert', 'https://awictor.github.io/base-convert/'],
  ['AspectRatio', 'https://awictor.github.io/aspect-ratio/'],
  ['PercentCalc', 'https://awictor.github.io/percent-calc/'],
  ['CSVJSON', 'https://awictor.github.io/csv-json/'],
  ['BMICalc', 'https://awictor.github.io/bmi-calc/'],
  ['TDEECalc', 'https://awictor.github.io/tdee-calc/'],
  ['DateDiff', 'https://awictor.github.io/date-diff/'],
  ['TaxCalc', 'https://awictor.github.io/tax-calc/'],
  ['RomanNumeral', 'https://awictor.github.io/roman-numeral/'],
  ['UnitConvert', 'https://awictor.github.io/unit-convert/'],
  ['DiscountCalc', 'https://awictor.github.io/discount-calc/'],
  ['GradeCalc', 'https://awictor.github.io/grade-calc/'],
  ['PaceCalc', 'https://awictor.github.io/pace-calc/'],
  ['PxRem', 'https://awictor.github.io/px-rem/'],
  ['LineTools', 'https://awictor.github.io/line-tools/'],
  ['RandomPick', 'https://awictor.github.io/random-pick/'],
  ['RegexTest', 'https://awictor.github.io/regex-test/'],
  ['MorseCode', 'https://awictor.github.io/morse-code/'],
  ['WageCalc', 'https://awictor.github.io/wage-calc/'],
  ['URLParse', 'https://awictor.github.io/url-parse/'],
  ['TypeScale', 'https://awictor.github.io/type-scale/'],
  ['OneRepMax', 'https://awictor.github.io/one-rep-max/'],
  ['HTMLEntities', 'https://awictor.github.io/html-entities/'],
  ['StrengthCheck', 'https://awictor.github.io/strength-check/'],
  ['SaveGoal', 'https://awictor.github.io/save-goal/'],
  ['TitleCase', 'https://awictor.github.io/title-case/'],
  ['AgeCalc', 'https://awictor.github.io/age-calc/'],
  ['InflationCalc', 'https://awictor.github.io/inflation-calc/'],
  ['WaterIntake', 'https://awictor.github.io/water-intake/'],
  ['FractionConvert', 'https://awictor.github.io/fraction-convert/'],
  ['ClampGen', 'https://awictor.github.io/clamp-gen/'],
  ['Slugify', 'https://awictor.github.io/slugify/'],
  ['MacroCalc', 'https://awictor.github.io/macro-calc/'],
  ['ROICalc', 'https://awictor.github.io/roi-calc/'],
  ['SubnetCalc', 'https://awictor.github.io/subnet-calc/'],
  ['NumWords', 'https://awictor.github.io/num-words/'],
  ['HoursCalc', 'https://awictor.github.io/hours-calc/'],
  ['ShadeGen', 'https://awictor.github.io/shade-gen/'],
  ['AuthCode', 'https://awictor.github.io/auth-code/'],
  ['MdTable', 'https://awictor.github.io/md-table/'],
  ['HeartZones', 'https://awictor.github.io/heart-zones/'],
  ['CSPKit', 'https://awictor.github.io/csp-kit/'],
  ['GradientGen', 'https://awictor.github.io/gradient-gen/'],
  ['MdPreview', 'https://awictor.github.io/md-preview/'],
  ['ByteSize', 'https://awictor.github.io/byte-size/'],
  ['FindReplace', 'https://awictor.github.io/find-replace/'],
  ['HmacGen', 'https://awictor.github.io/hmac-gen/'],
  ['JsonToTs', 'https://awictor.github.io/json-to-ts/'],
  ['BodyFat', 'https://awictor.github.io/body-fat/'],
  ['MathKit', 'https://awictor.github.io/math-kit/'],
  ['ShadowGen', 'https://awictor.github.io/shadow-gen/'],
  ['TokenGen', 'https://awictor.github.io/token-gen/'],
  ['Amortize', 'https://awictor.github.io/amortize/'],
  ['Similarity', 'https://awictor.github.io/similarity/'],
  ['CheckDigit', 'https://awictor.github.io/check-digit/'],
  ['Easing', 'https://awictor.github.io/easing/'],
  ['CipherNote', 'https://awictor.github.io/cipher-note/'],
  ['Duration', 'https://awictor.github.io/duration/'],
  ['Harmony', 'https://awictor.github.io/color-harmony/'],
  ['DotEnv', 'https://awictor.github.io/dotenv/'],
  ['TextClean', 'https://awictor.github.io/text-clean/'],
  ['IdealWeight', 'https://awictor.github.io/ideal-weight/'],
  ['SriGen', 'https://awictor.github.io/sri-gen/'],
  ['RotCipher', 'https://awictor.github.io/rot-cipher/'],
  ['A1C', 'https://awictor.github.io/a1c/'],
  ['GPACalc', 'https://awictor.github.io/gpa-calc/'],
  ['FilterGen', 'https://awictor.github.io/filter-gen/'],
  ['UlidGen', 'https://awictor.github.io/ulid-gen/'],
  ['SciNotation', 'https://awictor.github.io/sci-notation/'],
  ['DueDate', 'https://awictor.github.io/due-date/'],
  ['Base32', 'https://awictor.github.io/base32/'],
  ['WordFreq', 'https://awictor.github.io/word-freq/'],
  ['Uuid5', 'https://awictor.github.io/uuid5/'],
  ['CalBurn', 'https://awictor.github.io/cal-burn/'],
  ['TextReverse', 'https://awictor.github.io/text-reverse/'],
  ['RadiusGen', 'https://awictor.github.io/radius-gen/'],
  ['JsonToCsv', 'https://awictor.github.io/json-to-csv/'],
  ['SleepCalc', 'https://awictor.github.io/sleep-calc/'],
  ['QueryString', 'https://awictor.github.io/query-string/'],
  ['Readability', 'https://awictor.github.io/readability/'],
  ['Base58', 'https://awictor.github.io/base58/'],
  ['TransformGen', 'https://awictor.github.io/transform-gen/'],
  ['WaistHeight', 'https://awictor.github.io/waist-height/'],
  ['Unicode', 'https://awictor.github.io/unicode/'],
  ['MdToc', 'https://awictor.github.io/md-toc/'],
  ['Crc32', 'https://awictor.github.io/crc32/'],
  ['TextShadowGen', 'https://awictor.github.io/text-shadow-gen/'],
  ['ChmodCalc', 'https://awictor.github.io/chmod-calc/'],
  ['Specificity', 'https://awictor.github.io/css-specificity/'],
  ['HashID', 'https://awictor.github.io/hash-id/'],
  ['Phonetic', 'https://awictor.github.io/nato-phonetic/'],
  ['PositionSize', 'https://awictor.github.io/position-size/'],
  ['RecipeScaler', 'https://awictor.github.io/recipe-scaler/'],
  ['GridGen', 'https://awictor.github.io/css-grid-gen/'],
  ['SchemaGen', 'https://awictor.github.io/json-schema-gen/'],
  ['JwtSign', 'https://awictor.github.io/jwt-sign/'],
  ['BizDays', 'https://awictor.github.io/business-days/'],
  ['BACCalc', 'https://awictor.github.io/bac-calc/'],
  ['Fixate', 'https://awictor.github.io/fixate/'],
  ['JsonToYaml', 'https://awictor.github.io/json-to-yaml/'],
];

let n = 0; const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

for (const [name, url] of tools) {
  check(`links ${name}`, () => {
    assert.ok(html.includes(url), `missing URL ${url}`);
    assert.ok(html.includes('>' + name + '<'), `missing name ${name}`);
  });
}
check('exactly 122 tool cards', () => {
  assert.equal((html.match(/class="card"/g) || []).length, 122);
});
check('tools grouped into category sections', () => {
  assert.equal((html.match(/class="cat"/g) || []).length, 7);
  for (const c of ['Finance', 'Developer', 'Design', 'Security', 'Writing', 'Health', 'Everyday'])
    assert.ok(html.includes('<h3>' + c) || html.includes(c + '</h3>') || new RegExp('<h3>'+c).test(html), 'missing category ' + c);
});
check('valid JSON-LD ItemList with 122 items', () => {
  const m = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert.ok(m, 'no JSON-LD block');
  const data = JSON.parse(m[1]);
  assert.equal(data['@type'], 'ItemList');
  assert.equal(data.itemListElement.length, 122);
  assert.equal(data.itemListElement[0].item.url, tools[0][1]);
});

check('sitemap.xml lists all 122 pages', () => {
  const sm = readFileSync(join(__dirname, '..', 'sitemap.xml'), 'utf8');
  const urls = ['toolkit', ...tools.map(t => t[1])];
  assert.equal((sm.match(/<loc>/g) || []).length, 123);
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
