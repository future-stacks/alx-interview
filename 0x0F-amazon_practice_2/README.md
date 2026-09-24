# Amazon Assessment Practice, Set 2 (JavaScript)

Write your answers in `mine.js` (same function names, exported with
`module.exports = { ... }`), then check them with:

```
node test.js mine.js
```

Only open `solutions.js` after you've tried.

| # | Question | Pattern |
|---|----------|---------|
| 9 | **Group Anagrams** — Group words that use the same letters. `['eat','tea','tan','ate','nat','bat']` → `[['eat','tea','ate'],['tan','nat'],['bat']]` (any order) | Map with a signature key |
| 10 | **Best Time to Buy and Sell** — Buy one day, sell a later day. Max profit (0 if none). `[7,1,5,3,6,4]` → `5` | Running minimum |
| 11 | **Product Except Self** — For each index, the product of every other number, without division. `[1,2,3,4]` → `[24,12,8,6]` | Prefix / suffix |
| 12 | **Rotting Oranges** — Grid: 0 empty, 1 fresh, 2 rotten. Each minute rot spreads up/down/left/right. Minutes until no fresh orange is left, or `-1`. `[[2,1,1],[1,1,0],[0,1,1]]` → `4` | Multi-source BFS |
| 13 | **K Closest Delivery Locations** — Return the `k` points closest to `[0,0]`. `([[1,3],[-2,2]], 1)` → `[[-2,2]]` | Sort by distance |
| 14 | **Minimum Servers** — Jobs `[start,end)`. Fewest servers so no two overlapping jobs share one. `[[0,30],[5,10],[15,20]]` → `2` | Sort + sweep |
| 15 | **Subarray Sum Equals K** — Count contiguous subarrays that sum to `k`. `([1,1,1], 2)` → `2` | Prefix sum + Map |
| 16 | **Reorder Log Files** — Each log is `id words...`. Letter-logs first, sorted by content then id; digit-logs after, in original order. | Custom sort |
| 17 | **Search Suggestions** — After each typed letter of `searchWord`, return up to 3 products (alphabetical) starting with what's typed so far. | Sort + prefix |
| 18 | **Connect Ropes** — Joining two ropes costs their total length. Minimum total cost to join all. `[8,4,6,12]` → `58` | Min-heap (always join the two smallest) |
| 19 | **Can Finish Courses** — `n` courses and pairs `[course, mustTakeFirst]`. Can you finish them all? `(2, [[1,0],[0,1]])` → `false` | Topological sort |
| 20 | **Items in Containers** — `s` like `'|**|*|*'`: `*` items, `\|` walls. For each 1-based `[start,end]`, count items inside closed compartments fully within the range. `('|**|*|*', [1,1], [5,6])` → `[2,3]` | Prefix sums |
