const read = require('read-file');

read('day3input.txt', 'utf8', function (err, buffer) {
  if (err) {
    console.error(err);
  } else {
    const bits = buffer.split('\n').map(x => x.split('').map(x => Number(x)));
    const gammaBinary = bits
      .reduce((prev, current) => {
        let copy = [...prev];
        for (let i = 0; i < current.length; i++) {
          if (current[i] === 1) {
            copy[i] = copy[i] + 1;
          } else {
            copy[i] = copy[i] - 1;
          }
        }
        return copy;
      }, Array(bits[0].length).fill(0))
      .map(x => String(x > 0 ? 1 : 0))
      .join('');
    const epsilon = parseInt(
      gammaBinary
        .split('')
        .map(x => (x === '1' ? '0' : '1'))
        .join(''),
      2
    );
    const gamma = parseInt(gammaBinary, 2);
    console.log(`Part 1 answer: ${gamma * epsilon}`);
  }
});
