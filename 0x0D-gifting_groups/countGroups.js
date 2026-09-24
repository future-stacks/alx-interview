#!/usr/bin/node
'use strict';

/*
 * Complete the 'countGroups' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING_ARRAY related as parameter.
 */

function countGroups(related) {
  const n = related.length;
  const visited = new Array(n).fill(false);
  let groups = 0;

  for (let start = 0; start < n; start++) {
    if (visited[start]) continue;
    groups++;
    const stack = [start];
    visited[start] = true;
    while (stack.length > 0) {
      const person = stack.pop();
      for (let other = 0; other < n; other++) {
        const connected = related[person][other] === '1' || related[other][person] === '1';
        if (connected && !visited[other]) {
          visited[other] = true;
          stack.push(other);
        }
      }
    }
  }
  return groups;
}

module.exports = countGroups;

if (require.main === module) {
  console.log(countGroups(['110', '110', '001'])); // 2
  console.log(countGroups(['1100', '1110', '0110', '0001'])); // 2
  console.log(countGroups(['10000', '01000', '00100', '00010', '00001'])); // 5
  console.log(countGroups(['1001', '0100', '0010', '0001'])); // 3 (one-way link 0->3)
  const big = Array.from({ length: 300 }, () => '1'.repeat(300));
  console.log(countGroups(big)); // 1
}
