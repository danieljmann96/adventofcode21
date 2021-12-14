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
    const mean = Math.ceil(crabs.reduce((a, b) => a + b) / crabs.length);
    const averagesToTest = [];
    for (let i = -5; i < 6; i++) {
      averagesToTest.push(mean + i);
    }
    const fuels = [];
    averagesToTest.forEach(average => {
      let fuel = 0;
      crabs.forEach(crab => {
        if (crab < average) {
          fuel += ((average - crab) * (average - crab + 1)) / 2;
        } else if (crab > average) {
          fuel += ((crab - average) * (crab - average + 1)) / 2;
        }
      });
      fuels.push(fuel);
    });
    console.log(`Part 2 answer: ${Math.min(...fuels)}`);
  }
});
