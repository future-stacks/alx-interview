#!/usr/bin/node
'use strict';

// 9. Group Anagrams (Map with a "signature" key)
function groupAnagrams(words) {
  const groups = new Map();
  for (const w of words) {
    const key = w.split('').sort().join('');
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(w);
  }
  return [...groups.values()];
}

// 10. Best Time to Buy and Sell (Running minimum)
function maxProfit(prices) {
  let cheapest = Infinity;
  let best = 0;
  for (const p of prices) {
    cheapest = Math.min(cheapest, p);
    best = Math.max(best, p - cheapest);
  }
  return best;
}

// 11. Product of Array Except Self (Prefix / suffix)
function productExceptSelf(nums) {
  const n = nums.length;
  const result = new Array(n).fill(1);
  let left = 1;
  for (let i = 0; i < n; i++) {
    result[i] = left;
    left *= nums[i];
  }
  let right = 1;
  for (let i = n - 1; i >= 0; i--) {
    result[i] *= right;
    right *= nums[i];
  }
  return result;
}

// 12. Rotting Oranges (Multi-source BFS)
// 0 empty, 1 fresh, 2 rotten. Minutes until no fresh left, or -1.
function orangesRotting(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const g = grid.map((row) => [...row]);
  let queue = [];
  let fresh = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (g[r][c] === 2) queue.push([r, c]);
      else if (g[r][c] === 1) fresh++;
    }
  }
  let minutes = 0;
  const moves = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  while (queue.length > 0 && fresh > 0) {
    const next = [];
    for (const [r, c] of queue) {
      for (const [dr, dc] of moves) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && g[nr][nc] === 1) {
          g[nr][nc] = 2;
          fresh--;
          next.push([nr, nc]);
        }
      }
    }
    queue = next;
    minutes++;
  }
  return fresh === 0 ? minutes : -1;
}

// 13. K Closest Delivery Locations (Sort by distance)
function kClosest(points, k) {
  return [...points]
    .sort((a, b) => (a[0] ** 2 + a[1] ** 2) - (b[0] ** 2 + b[1] ** 2))
    .slice(0, k);
}

// 14. Minimum Servers Needed (Sort start/end times, sweep)
// jobs: [start, end). Most jobs running at the same moment.
function minServers(jobs) {
  const starts = jobs.map((j) => j[0]).sort((a, b) => a - b);
  const ends = jobs.map((j) => j[1]).sort((a, b) => a - b);
  let running = 0;
  let most = 0;
  let e = 0;
  for (let s = 0; s < starts.length; s++) {
    while (e < ends.length && ends[e] <= starts[s]) {
      running--;
      e++;
    }
    running++;
    most = Math.max(most, running);
  }
  return most;
}

// 15. Subarray Sum Equals K (Prefix sum + Map)
function subarraySum(nums, k) {
  const seen = new Map([[0, 1]]); // prefix sum -> how many times
  let sum = 0;
  let count = 0;
  for (const x of nums) {
    sum += x;
    count += seen.get(sum - k) || 0;
    seen.set(sum, (seen.get(sum) || 0) + 1);
  }
  return count;
}

// 16. Reorder Log Files (Custom sort) - Amazon classic
function reorderLogFiles(logs) {
  const letters = [];
  const digits = [];
  for (const log of logs) {
    const space = log.indexOf(' ');
    const body = log.slice(space + 1);
    if (/^\d/.test(body)) digits.push(log);
    else letters.push({ id: log.slice(0, space), body, log });
  }
  letters.sort((a, b) => {
    if (a.body !== b.body) return a.body < b.body ? -1 : 1;
    return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
  });
  return [...letters.map((l) => l.log), ...digits];
}

// 17. Search Suggestions (Sort + prefix filter) - Amazon classic
function suggestedProducts(products, searchWord) {
  const sorted = [...products].sort();
  const result = [];
  let prefix = '';
  for (const ch of searchWord) {
    prefix += ch;
    result.push(sorted.filter((p) => p.startsWith(prefix)).slice(0, 3));
  }
  return result;
}

// 18. Minimum Cost to Connect Ropes (Min-heap)
class MinHeap {
  constructor() { this.data = []; }
  size() { return this.data.length; }
  push(val) {
    const d = this.data;
    d.push(val);
    let i = d.length - 1;
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (d[parent] <= d[i]) break;
      [d[parent], d[i]] = [d[i], d[parent]];
      i = parent;
    }
  }
  pop() {
    const d = this.data;
    const top = d[0];
    const last = d.pop();
    if (d.length > 0) {
      d[0] = last;
      let i = 0;
      for (;;) {
        const l = 2 * i + 1;
        const r = 2 * i + 2;
        let smallest = i;
        if (l < d.length && d[l] < d[smallest]) smallest = l;
        if (r < d.length && d[r] < d[smallest]) smallest = r;
        if (smallest === i) break;
        [d[smallest], d[i]] = [d[i], d[smallest]];
        i = smallest;
      }
    }
    return top;
  }
}

function connectRopes(ropes) {
  const heap = new MinHeap();
  for (const r of ropes) heap.push(r);
  let cost = 0;
  while (heap.size() > 1) {
    const joined = heap.pop() + heap.pop();
    cost += joined;
    heap.push(joined);
  }
  return cost;
}

// 19. Can Finish All Courses? (Topological sort)
// prerequisites: [course, mustTakeFirst]
function canFinish(numCourses, prerequisites) {
  const needs = new Array(numCourses).fill(0);
  const unlocks = Array.from({ length: numCourses }, () => []);
  for (const [course, first] of prerequisites) {
    needs[course]++;
    unlocks[first].push(course);
  }
  const ready = [];
  for (let i = 0; i < numCourses; i++) if (needs[i] === 0) ready.push(i);
  let taken = 0;
  while (ready.length > 0) {
    const c = ready.pop();
    taken++;
    for (const next of unlocks[c]) {
      needs[next]--;
      if (needs[next] === 0) ready.push(next);
    }
  }
  return taken === numCourses;
}

// 20. Items in Containers (Prefix sums) - Amazon classic
// s like '|**|*|*'. For each 1-based [start, end], count '*' inside
// closed compartments (between two '|') fully within that range.
function numberOfItems(s, startIndices, endIndices) {
  const n = s.length;
  const starsBefore = new Array(n + 1).fill(0); // stars in s[0..i-1]
  for (let i = 0; i < n; i++) starsBefore[i + 1] = starsBefore[i] + (s[i] === '*' ? 1 : 0);
  const nextBar = new Array(n).fill(-1);
  let bar = -1;
  for (let i = n - 1; i >= 0; i--) {
    if (s[i] === '|') bar = i;
    nextBar[i] = bar;
  }
  const prevBar = new Array(n).fill(-1);
  bar = -1;
  for (let i = 0; i < n; i++) {
    if (s[i] === '|') bar = i;
    prevBar[i] = bar;
  }
  return startIndices.map((start, q) => {
    const left = nextBar[start - 1];
    const right = prevBar[endIndices[q] - 1];
    if (left === -1 || right === -1 || left >= right) return 0;
    return starsBefore[right] - starsBefore[left];
  });
}

module.exports = {
  groupAnagrams,
  maxProfit,
  productExceptSelf,
  orangesRotting,
  kClosest,
  minServers,
  subarraySum,
  reorderLogFiles,
  suggestedProducts,
  connectRopes,
  canFinish,
  numberOfItems,
};
