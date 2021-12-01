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
  }
});
