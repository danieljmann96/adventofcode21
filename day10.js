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

read('day10input.txt', 'utf8', function (err, buffer) {
  if (err) {
    console.error(err);
  } else {
    const rows = buffer.split('\n').map(x => x.split(''));
    const firstIllegals = [];
    rows.forEach(row => {
      const expected = [];
      innerLoop: for (let i = 0; i < row.length; i++) {
        if (Object.keys(pairs).includes(row[i])) {
          expected.push(pairs[row[i]]);
        } else if (expected[expected.length - 1] === row[i]) {
          expected.pop();
        } else {
          firstIllegals.push(row[i]);
          break innerLoop;
        }
      }
    });
    console.log(`Part 1 answer: ${firstIllegals.reduce((a, b) => a + lookup[b], 0)}`);
  }
});
