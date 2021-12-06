const read = require('read-file');

function part2MostCommon(arr, i) {
  if (arr.length === 1) return arr;
  const mostCommon =
    arr.reduce(
      (prev, current) => (current[i] === '0' ? prev - 1 : prev + 1),
      0
    ) >= 0
      ? '1'
      : '0';
  return arr.filter(x => x[i] === mostCommon);
}

function part2LeastCommon(arr, i) {
  if (arr.length === 1) return arr;
  const leastCommon =
    arr.reduce(
      (prev, current) => (current[i] === '0' ? prev + 1 : prev - 1),
      0
    ) > 0
      ? '1'
      : '0';
  return arr.filter(x => x[i] === leastCommon);
}

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
    let bits2Most = [...bits.map(x => x.join(''))];
    let bits2Least = [...bits.map(x => x.join(''))];
    for (let i = 0; i < bits[0].length; i++) {
      bits2Most = part2MostCommon(bits2Most, i);
      bits2Least = part2LeastCommon(bits2Least, i);
    }
    console.log(
      `Part 2 answer: ${parseInt(bits2Most[0], 2) * parseInt(bits2Least[0], 2)}`
    );
  }
});
