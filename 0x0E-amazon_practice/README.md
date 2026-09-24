# Amazon Assessment Practice (JavaScript)

Try each question yourself in a new file (e.g. `mine.js`) before opening `solutions.js`.
Export your functions with the same names, then check them:

```
node test.js mine.js
```

| # | Question | Pattern |
|---|----------|---------|
| 1 | **Two Sum** — Given `nums` and `target`, return the indexes of the two numbers that add up to `target`. `twoSum([2,7,11,15], 9)` → `[0,1]` | Lookup (`Map`) |
| 2 | **Top K Products** — Given a list of product names bought, return the `k` most frequent. Break ties alphabetically. `(['apple','pen','apple','book','pen','apple'], 2)` → `['apple','pen']` | Counting + sort |
| 3 | **Number of Islands** — Grid of `'1'` (land) and `'0'` (water) strings. Count islands (land connected up/down/left/right). `['11000','11000','00100','00011']` → `3` | Groups (stickers + bucket) |
| 4 | **Longest Unique Substring** — Length of the longest substring with no repeated characters. `'abcabcbb'` → `3` | Sliding window |
| 5 | **Ship Within D Days** — Packages must ship in order. Find the smallest truck capacity that ships all `weights` within `days`. `([1..10], 5)` → `15` | Binary search on the answer |
| 6 | **Delivery Robot** — Grid with `S` start, `D` destination, `#` wall, `.` open. Fewest moves from S to D, or `-1`. `['S.#','..#','#.D']` → `4` | BFS (shortest path) |
| 7 | **Merge Time Windows** — Merge overlapping `[start,end]` intervals. `[[1,3],[8,10],[2,6],[15,18]]` → `[[1,6],[8,10],[15,18]]` | Sort + sweep |
| 8 | **Valid Brackets** — Is every `( [ {` closed in the right order? `'([{}])'` → `true`, `'(]'` → `false` | Stack |
