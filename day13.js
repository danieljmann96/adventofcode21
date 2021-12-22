const read = require('read-file');
const plotlib = require('nodeplotlib');

class Point {
  x;
  y;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  foldX(val) {
    if (this.x > val) {
      this.x = this.x + (val - this.x) * 2;
    }
  }
  foldY(val) {
    if (this.y > val) {
      this.y = this.y + (val - this.y) * 2;
    }
  }
}

const reversePoints = [5, 4, 3, 2, 1, 0];

read('day13input.txt', 'utf8', function (err, buffer) {
  if (err) {
    console.error(err);
  } else {
    const rows = buffer.split('\n');
    let points = rows
      .filter(x => x.includes(','))
      .map(x => new Point(Number(x.split(',')[0]), Number(x.split(',')[1])));
    const foldInstructions = rows
      .filter(x => x.includes('fold'))
      .map(x => (x.includes('\r') ? x.substr(0, x.length - 1) : x))
      .map(x => [x.split('=')[0][11], Number(x.split('=')[1])]);
    let firstFoldValue = 0;
    foldInstructions.forEach((fold, i) => {
      if (fold[0] === 'x') {
        points.forEach(point => point.foldX(fold[1]));
      } else {
        points.forEach(point => point.foldY(fold[1]));
      }
      if (i === 0) {
        firstFoldValue = [...new Set(points.map(point => JSON.stringify(point)))].length;
      }
    });
    console.log(`Part 1 answer: ${firstFoldValue}`);
    const pointData = [...new Set(points.map(point => JSON.stringify(point)))].map(x => JSON.parse(x));
    const data = [
      { x: pointData.map(x => x.x), y: pointData.map(x => reversePoints[x.y]), type: 'scatter', mode: 'markers' }
    ];
    plotlib.plot(data);
  }
});
