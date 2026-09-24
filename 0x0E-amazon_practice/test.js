#!/usr/bin/node
'use strict';

// Usage: node test.js            -> tests solutions.js
//        node test.js mine.js    -> tests your own attempt
const assert = require('assert');
const path = require('path');

const file = process.argv[2] || 'solutions.js';
const s = require(path.resolve(__dirname, file));

const cases = {
  twoSum: [
    [[[2, 7, 11, 15], 9], [0, 1]],
    [[[3, 2, 4], 6], [1, 2]],
    [[[3, 3], 6], [0, 1]],
  ],
  topKProducts: [
    [[['apple', 'pen', 'apple', 'book', 'pen', 'apple'], 2], ['apple', 'pen']],
    [[['b', 'a', 'c'], 2], ['a', 'b']],
  ],
  numIslands: [
    [[['11000', '11000', '00100', '00011']], 3],
    [[['111', '010', '111']], 1],
    [[['000']], 0],
  ],
  longestUniqueSubstring: [
    [['abcabcbb'], 3],
    [['bbbbb'], 1],
    [['pwwkew'], 3],
    [[''], 0],
    [['abba'], 2],
  ],
  shipWithinDays: [
    [[[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5], 15],
    [[[3, 2, 2, 4, 1, 4], 3], 6],
    [[[1, 2, 3, 1, 1], 4], 3],
  ],
  minDeliverySteps: [
    [[['S.#', '..#', '#.D']], 4],
    [[['S#D']], -1],
    [[['SD']], 1],
  ],
  mergeIntervals: [
    [[[[1, 3], [8, 10], [2, 6], [15, 18]]], [[1, 6], [8, 10], [15, 18]]],
    [[[[1, 4], [4, 5]]], [[1, 5]]],
    [[[[1, 10], [2, 3]]], [[1, 10]]],
  ],
  isValidBrackets: [
    [['()[]{}'], true],
    [['(]'], false],
    [['([{}])'], true],
    [['(('], false],
    [[')'], false],
  ],
};

let passed = 0;
let failed = 0;
for (const [name, tests] of Object.entries(cases)) {
  if (typeof s[name] !== 'function') {
    console.log(`SKIP ${name} (not exported)`);
    continue;
  }
  tests.forEach(([args, expected], i) => {
    try {
      assert.deepStrictEqual(s[name](...args), expected);
      passed++;
    } catch (e) {
      failed++;
      console.log(`FAIL ${name} #${i + 1}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(s[name](...args))}`);
    }
  });
}
console.log(`\n${passed} passed, ${failed} failed`);
process.exitCode = failed ? 1 : 0;
