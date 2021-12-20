const read = require('read-file');

const pairs = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>'
};

const lookup = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137
};

const completions = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4
};

function findMedian(arr) {
  const sorted = arr.sort((a, b) => a - b);
  if (sorted.length % 2 === 0) {
    return (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2;
  } else {
    return sorted[Math.floor(sorted.length / 2)];
  }
}

read('day10input.txt', 'utf8', function (err, buffer) {
  if (err) {
    console.error(err);
  } else {
    const rows = buffer.split('\n').map(x => x.split(''));
    const firstIllegals = [];
    const completionScores = [];
    rows.forEach(row => {
      const expected = [];
      let isIncomplete = true;
      innerLoop: for (let i = 0; i < row.length; i++) {
        if (Object.keys(pairs).includes(row[i])) {
          expected.push(pairs[row[i]]);
        } else if (expected[expected.length - 1] === row[i]) {
          expected.pop();
        } else {
          firstIllegals.push(row[i]);
          isIncomplete = false;
          break innerLoop;
        }
      }
      if (isIncomplete) {
        completionScores.push(expected.reverse().reduce((a, b) => a * 5 + completions[b], 0));
      }
    });
    console.log(`Part 1 answer: ${firstIllegals.reduce((a, b) => a + lookup[b], 0)}`);
    console.log(`Part 2 answer: ${findMedian(completionScores.filter(x => x > 0))}`);
  }
});
