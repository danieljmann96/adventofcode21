const read = require('read-file');

read('day1input.txt', 'utf8', function (err, buffer) {
  if (err) {
    console.error(err);
  } else {
    const numArr = buffer.split('\n').map(x => Number(x));
    let count = 0;
    for (let i = 1; i < numArr.length; i++) {
      if (numArr[i] > numArr[i - 1]) {
        count++;
      }
    }
    console.log(`Part 1 answer: ${count}`);
    const sums = [];
    for (let i = 0; i < numArr.length - 2; i++) {
      sums.push(numArr[i] + numArr[i + 1] + numArr[i + 2]);
    }
    let count2 = 0;
    for (let i = 1; i < sums.length; i++) {
      if (sums[i] > sums[i - 1]) {
        count2++;
      }
    }
    console.log(`Part 2 answer: ${count2}`);
  }
});
