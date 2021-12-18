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
    function getAdjacentPoints(point) {
      const adjacentPoints = [];
      const left = points.find(elem => elem.x === point.x - 1 && elem.y === point.y);
      if (left) {
        adjacentPoints.push(left);
      }
      const right = points.find(elem => elem.x === point.x + 1 && elem.y === point.y);
      if (right) {
        adjacentPoints.push(right);
      }
      const up = points.find(elem => elem.x === point.x && elem.y === point.y + 1);
      if (up) {
        adjacentPoints.push(up);
      }
      const down = points.find(elem => elem.x === point.x && elem.y === point.y - 1);
      if (down) {
        adjacentPoints.push(down);
      }
      return adjacentPoints;
    }
    //PART 1 SOLVED
    const lowPoints = [];
    points.forEach(point => {
      if (point.value < Math.min(...getAdjacentPoints(point).map(x => x.value))) {
        lowPoints.push(point);
      }
    });
    console.log(`Part 1 answer: ${lowPoints.map(x => x.value).reduce((a, b) => a + b) + lowPoints.length}`);
    //PART 2 UNSOLVED
    let basins = [];
    points.forEach(point => {
      let adjacents = getAdjacentPoints(point).filter(x => x.value > point.value);
      for (let i = 0; i < adjacents.length; i++) {
        let adjs = getAdjacentPoints(adjacents[i]).filter(x => x.value > adjacents[i].value);
        if (adjs.length > 0) {
          adjacents.push(...adjs);
        }
      }
      basins.push([...new Set(adjacents.filter(x => x.value !== 9).map(x => JSON.stringify(x)))].length + 1);
    });
    console.log(
      `Part 2 answer: ${basins
        .sort((a, b) => b - a)
        .slice(0, 3)
        .reduce((a, b) => a * b)}`
    );
  }
});
