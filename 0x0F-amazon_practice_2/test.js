#!/usr/bin/node
'use strict';

// Usage: node test.js            -> tests solutions.js
//        node test.js mine.js    -> tests your own attempt
const assert = require('assert');
const path = require('path');

const file = process.argv[2] || 'solutions.js';
const s = require(path.resolve(__dirname, file));

// groupAnagrams order doesn't matter, so compare sorted groups.
const normalizeGroups = (groups) => groups.map((g) => [...g].sort()).sort((a, b) => a.join().localeCompare(b.join()));
// kClosest may return ties in any order.
const normalizePoints = (pts) => [...pts].sort((a, b) => a[0] - b[0] || a[1] - b[1]);

const cases = {
  groupAnagrams: [
    [[['eat', 'tea', 'tan', 'ate', 'nat', 'bat']], [['ate', 'eat', 'tea'], ['bat'], ['nat', 'tan']], normalizeGroups],
    [[['']], [['']], normalizeGroups],
  ],
  maxProfit: [
    [[[7, 1, 5, 3, 6, 4]], 5],
    [[[7, 6, 4, 3, 1]], 0],
    [[[2, 4, 1, 7]], 6],
  ],
  productExceptSelf: [
    [[[1, 2, 3, 4]], [24, 12, 8, 6]],
    [[[2, 3]], [3, 2]],
    [[[1, 0, 3]], [0, 3, 0]],
  ],
  orangesRotting: [
    [[[[2, 1, 1], [1, 1, 0], [0, 1, 1]]], 4],
    [[[[2, 1, 1], [0, 1, 1], [1, 0, 1]]], -1],
    [[[[0, 2]]], 0],
  ],
  kClosest: [
    [[[[1, 3], [-2, 2]], 1], [[-2, 2]], normalizePoints],
    [[[[3, 3], [5, -1], [-2, 4]], 2], [[-2, 4], [3, 3]], normalizePoints],
  ],
  minServers: [
    [[[[0, 30], [5, 10], [15, 20]]], 2],
    [[[[7, 10], [2, 4]]], 1],
    [[[[1, 5], [5, 10]]], 1],
    [[[[1, 10], [2, 9], [3, 8]]], 3],
  ],
  subarraySum: [
    [[[1, 1, 1], 2], 2],
    [[[1, 2, 3], 3], 2],
    [[[1, -1, 0], 0], 3],
  ],
  reorderLogFiles: [
    [[['dig1 8 1 5 1', 'let1 art can', 'dig2 3 6', 'let2 own kit dig', 'let3 art zero']],
      ['let1 art can', 'let3 art zero', 'let2 own kit dig', 'dig1 8 1 5 1', 'dig2 3 6']],
    [[['a1 9 2 3 1', 'g1 act car', 'zo4 4 7', 'ab1 off key dog', 'a8 act zoo', 'a2 act car']],
      ['a2 act car', 'g1 act car', 'a8 act zoo', 'ab1 off key dog', 'a1 9 2 3 1', 'zo4 4 7']],
  ],
  suggestedProducts: [
    [[['mobile', 'mouse', 'moneypot', 'monitor', 'mousepad'], 'mouse'],
      [['mobile', 'moneypot', 'monitor'], ['mobile', 'moneypot', 'monitor'], ['mouse', 'mousepad'], ['mouse', 'mousepad'], ['mouse', 'mousepad']]],
    [[['havana'], 'tatiana'], [[], [], [], [], [], [], []]],
  ],
  connectRopes: [
    [[[8, 4, 6, 12]], 58],
    [[[20, 4, 8, 2]], 54],
    [[[5]], 0],
  ],
  canFinish: [
    [[2, [[1, 0]]], true],
    [[2, [[1, 0], [0, 1]]], false],
    [[4, [[1, 0], [2, 1], [3, 2]]], true],
  ],
  numberOfItems: [
    [['|**|*|*', [1, 1], [5, 6]], [2, 3]],
    [['*|*|', [1], [3]], [0]],
    [['*|*|*|', [1], [6]], [2]],
  ],
};

let passed = 0;
let failed = 0;
for (const [name, tests] of Object.entries(cases)) {
  if (typeof s[name] !== 'function') {
    console.log(`SKIP ${name} (not exported)`);
    continue;
  }
  tests.forEach(([args, expected, normalize], i) => {
    const norm = normalize || ((x) => x);
    let got;
    try {
      got = s[name](...args);
      assert.deepStrictEqual(norm(got), norm(expected));
      passed++;
    } catch (e) {
      failed++;
      console.log(`FAIL ${name} #${i + 1}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(got)}${got === undefined ? ` (${e.message.split('\n')[0]})` : ''}`);
    }
  });
}
console.log(`\n${passed} passed, ${failed} failed`);
process.exitCode = failed ? 1 : 0;
