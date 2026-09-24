#!/usr/bin/node
'use strict';

// 1. Two Sum (Lookup with a Map)
function twoSum(nums, target) {
  const seen = new Map(); // value -> index
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
  return [];
}

// 2. Top K Frequent Products (Counting + sort)
function topKProducts(products, k) {
  const counts = new Map();
  for (const p of products) counts.set(p, (counts.get(p) || 0) + 1);
  return [...counts.keys()]
    .sort((a, b) => counts.get(b) - counts.get(a) || a.localeCompare(b))
    .slice(0, k);
}

// 3. Number of Islands (Groups on a grid)
function numIslands(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const visited = grid.map((row) => new Array(row.length).fill(false));
  let islands = 0;
  const moves = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] !== '1' || visited[r][c]) continue;
      islands++;
      visited[r][c] = true;
      const stack = [[r, c]];
      while (stack.length > 0) {
        const [cr, cc] = stack.pop();
        for (const [dr, dc] of moves) {
          const nr = cr + dr;
          const nc = cc + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols &&
              grid[nr][nc] === '1' && !visited[nr][nc]) {
            visited[nr][nc] = true;
            stack.push([nr, nc]);
          }
        }
      }
    }
  }
  return islands;
}

// 4. Longest Substring Without Repeating Characters (Sliding window)
function longestUniqueSubstring(s) {
  const lastSeen = new Map(); // char -> last index
  let left = 0;
  let best = 0;
  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    if (lastSeen.has(ch) && lastSeen.get(ch) >= left) {
      left = lastSeen.get(ch) + 1;
    }
    lastSeen.set(ch, right);
    best = Math.max(best, right - left + 1);
  }
  return best;
}

// 5. Minimum Truck Capacity to Ship in D Days (Binary search on the answer)
function shipWithinDays(weights, days) {
  let low = Math.max(...weights);
  let high = weights.reduce((a, b) => a + b, 0);

  const canShip = (capacity) => {
    let daysUsed = 1;
    let load = 0;
    for (const w of weights) {
      if (load + w > capacity) {
        daysUsed++;
        load = 0;
      }
      load += w;
    }
    return daysUsed <= days;
  };

  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (canShip(mid)) high = mid;
    else low = mid + 1;
  }
  return low;
}

// 6. Delivery Robot Shortest Path (BFS)
// grid: 'S' start, 'D' destination, '#' wall, '.' open. Returns steps or -1.
function minDeliverySteps(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  let start = null;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 'S') start = [r, c];
    }
  }
  if (!start) return -1;

  const visited = grid.map((row) => new Array(row.length).fill(false));
  visited[start[0]][start[1]] = true;
  let queue = [start];
  let steps = 0;
  const moves = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  while (queue.length > 0) {
    const next = [];
    for (const [r, c] of queue) {
      if (grid[r][c] === 'D') return steps;
      for (const [dr, dc] of moves) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols &&
            grid[nr][nc] !== '#' && !visited[nr][nc]) {
          visited[nr][nc] = true;
          next.push([nr, nc]);
        }
      }
    }
    queue = next;
    steps++;
  }
  return -1;
}

// 7. Merge Delivery Time Windows (Sort + sweep)
function mergeIntervals(intervals) {
  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
  const merged = [];
  for (const [start, end] of sorted) {
    const last = merged[merged.length - 1];
    if (last && start <= last[1]) {
      last[1] = Math.max(last[1], end);
    } else {
      merged.push([start, end]);
    }
  }
  return merged;
}

// 8. Valid Brackets (Stack)
function isValidBrackets(s) {
  const pairs = { ')': '(', ']': '[', '}': '{' };
  const stack = [];
  for (const ch of s) {
    if (ch === '(' || ch === '[' || ch === '{') {
      stack.push(ch);
    } else if (pairs[ch]) {
      if (stack.pop() !== pairs[ch]) return false;
    }
  }
  return stack.length === 0;
}

module.exports = {
  twoSum,
  topKProducts,
  numIslands,
  longestUniqueSubstring,
  shipWithinDays,
  minDeliverySteps,
  mergeIntervals,
  isValidBrackets,
};
