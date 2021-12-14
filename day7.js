const read = require('read-file');

function findMedian(arr) {
  const sorted = arr.sort((a, b) => a - b);
  if (sorted.length % 2 === 0) {
    return (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2;
  } else {
    return sorted[Math.floor(sorted.length / 2)];
  }
}

read('day7input.txt', 'utf8', function (err, buffer) {
  if (err) {
    console.error(err);
  } else {
    let crabs = buffer.split(',').map(x => Number(x));
    const median = findMedian(crabs);
    let fuel = 0;
    crabs.forEach(crab => {
      if (crab < median) {
        fuel += median - crab;
      } else if (crab > median) {
        fuel += crab - median;
      }
    });
    console.log(`Part 1 answer: ${fuel}`);
  }
});
