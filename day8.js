const read = require('read-file');

function findMedian(arr) {
  const sorted = arr.sort((a, b) => a - b);
  if (sorted.length % 2 === 0) {
    return (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2;
  } else {
    return sorted[Math.floor(sorted.length / 2)];
  }
}

read('day8input.txt', 'utf8', function (err, buffer) {
  if (err) {
    console.error(err);
  } else {
    const part1 = buffer
      .split('\n')
      .map(x =>
        x
          .split('|')[1]
          .split(' ')
          .filter(y => y !== '')
      )
      .flat()
      .filter(x => x.length === 2 || x.length === 4 || x.length === 3 || x.length === 7).length;
    console.log(`Part 1 answer: ${part1}`);
  }
});
