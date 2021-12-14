const read = require('read-file');

read('day6input.txt', 'utf8', function (err, buffer) {
  if (err) {
    console.error(err);
  } else {
    const fishes = [buffer.split(',').map(x => Number(x))];
    //const fishes = [[3, 4, 3, 1, 2]];
    for (let day = 1; day < 81; day++) {
      let eights = fishes[day - 1].filter(x => x === 0).length;
      let fishToAdd = fishes[day - 1].map(x => (x === 0 ? 6 : x - 1));
      if (eights > 0) {
        for (let i = 0; i < eights; i++) {
          fishToAdd.push(8);
        }
      }
      fishes.push(fishToAdd);
    }
    console.log(`Part 1 answer: ${fishes[fishes.length - 1].length}`);
  }
});
