#!/usr/bin/node
'use strict';

/*
 * Complete the 'processLogs' function below.
 *
 * The function is expected to return a STRING_ARRAY.
 * The function accepts following parameters:
 *  1. STRING_ARRAY logs
 *  2. INTEGER threshold
 */

function processLogs(logs, threshold) {
  const counts = new Map();
  for (const log of logs) {
    const [sender, recipient] = log.trim().split(/\s+/);
    counts.set(sender, (counts.get(sender) || 0) + 1);
    if (recipient !== sender) {
      counts.set(recipient, (counts.get(recipient) || 0) + 1);
    }
  }
  const result = [];
  for (const [id, count] of counts) {
    if (count >= threshold) result.push(id);
  }
  return result.sort((a, b) => Number(a) - Number(b));
}

module.exports = processLogs;

if (require.main === module) {
  console.log(processLogs(['88 99 200', '88 99 300', '99 32 100', ' 12 12 15'], 2));
  console.log(processLogs(['9 7 50', '22 7 20', '33 7 50', '22 7 30'], 3));
  console.log(processLogs(['1 2 50', '1 7 70', '1 3 20', '2 2 17'], 2));
}
