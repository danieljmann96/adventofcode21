const read = require('read-file');

class Point {
  x;
  y;
  value;
  constructor(x, y, value) {
    this.x = x;
    this.y = y;
    this.value = value;
  }
}

read('day9input.txt', 'utf8', function (err, buffer) {
  if (err) {
    console.error(err);
  } else {
    const rows = buffer.split('\n');
    //const rows = ['2199943210', '3987894921', '9856789892', '8767896789', '9899965678'];
    const points = rows
      .reverse()
      .map((row, y) => row.split('').map((val, x) => new Point(x, y, Number(val))))
      .flat();
    const lowValues = [];
    points.forEach(point => {
      const adjacentValues = [];
      const left = points.find(elem => elem.x === point.x - 1 && elem.y === point.y);
      if (left) {
        adjacentValues.push(left.value);
      }
      const right = points.find(elem => elem.x === point.x + 1 && elem.y === point.y);
      if (right) {
        adjacentValues.push(right.value);
      }
      const up = points.find(elem => elem.x === point.x && elem.y === point.y + 1);
      if (up) {
        adjacentValues.push(up.value);
      }
      const down = points.find(elem => elem.x === point.x && elem.y === point.y - 1);
      if (down) {
        adjacentValues.push(down.value);
      }
      if (point.value < Math.min(...adjacentValues)) {
        lowValues.push(point.value);
      }
    });
    console.log(`Part 1 answer: ${lowValues.reduce((a, b) => a + b) + lowValues.length}`);
  }
});
