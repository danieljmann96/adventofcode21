const read = require('read-file');

class Insertion {
  value;
  position;
  constructor(value, position) {
    this.value = value;
    this.position = position;
  }
}

function most(arr) {
  const r = arr.sort((a, b) => arr.filter(v => v === a).length - arr.filter(v => v === b).length);
  return r.slice(r.indexOf(r[r.length - 1])).length;
}

function least(arr) {
  const r = arr.sort((a, b) => arr.filter(v => v === a).length - arr.filter(v => v === b).length).reverse();
  return r.slice(r.indexOf(r[r.length - 1])).length;
}

read('day14input.txt', 'utf8', function (err, buffer) {
  if (err) {
    console.error(err);
  } else {
    const rows = buffer.split('\n');
    let polymer = (rows[0].includes('\r') ? rows[0].substring(0, rows[0].length - 1) : rows[0]).split('');
    const instructions = rows
      .splice(2, rows.length - 2)
      .map(x => (x.includes('\r') ? x.substring(0, x.length - 1) : x))
      .map(x => x.split(' -> '));
    const steps = 10;
    for (let i = 0; i < steps; i++) {
      const insertions = [];
      let nextInsertionIndex = 1;
      polymer.forEach((letter, lI) => {
        if (lI !== polymer.length - 1) {
          const pair = `${letter}${polymer[lI + 1]}`;
          const insert = instructions.find(x => x[0] === pair);
          insertions.push(new Insertion(insert[1], nextInsertionIndex));
          nextInsertionIndex += 2;
        }
      });
      insertions.forEach(insertion => {
        polymer = [
          ...polymer.slice(0, insertion.position),
          insertion.value,
          ...polymer.slice(insertion.position, polymer.length)
        ];
      });
    }

    console.log(`Part 1 answer: ${most(polymer) - least(polymer)}`);
  }
});
