const read = require('read-file');

read('day5input.txt', 'utf8', function (err, buffer) {
  if (err) {
    console.error(err);
  } else {
    const lines = buffer.split('\n').map(x =>
      x
        .split(' -> ')
        .map(y => y.split(',').map(z => Number(z)))
        .map(point => {
          return {
            x: point[0],
            y: point[1]
          };
        })
    );
    let points = [];
    let dupes = [];
    lines.forEach((line, i) => {
      console.log(`${i}/500`);
      if (line[0].x === line[1].x) {
        if (line[0].y > line[1].y) {
          for (let i = line[0].y; i > line[1].y - 1; i--) {
            if (points.includes(JSON.stringify({ x: line[0].x, y: i }))) {
              dupes.push(JSON.stringify({ x: line[0].x, y: i }));
            }
            points.push(JSON.stringify({ x: line[0].x, y: i }));
          }
        } else {
          for (let i = line[0].y; i < line[1].y + 1; i++) {
            if (points.includes(JSON.stringify({ x: line[0].x, y: i }))) {
              dupes.push(JSON.stringify({ x: line[0].x, y: i }));
            }
            points.push(JSON.stringify({ x: line[0].x, y: i }));
          }
        }
      } else if (line[0].y === line[1].y) {
        if (line[0].x > line[1].x) {
          for (let i = line[0].x; i > line[1].x - 1; i--) {
            if (points.includes(JSON.stringify({ x: i, y: line[0].y }))) {
              dupes.push(JSON.stringify({ x: i, y: line[0].y }));
            }
            points.push(JSON.stringify({ x: i, y: line[0].y }));
          }
        } else {
          for (let i = line[0].x; i < line[1].x + 1; i++) {
            if (points.includes(JSON.stringify({ x: i, y: line[0].y }))) {
              dupes.push(JSON.stringify({ x: i, y: line[0].y }));
            }
            points.push(JSON.stringify({ x: i, y: line[0].y }));
          }
        }
      } else if (line[0].x > line[1].x && line[0].y < line[1].y) {
        for (let x = line[0].x, y = line[0].y; x > line[1].x - 1, y < line[1].y + 1; x--, y++) {
          if (points.includes(JSON.stringify({ x, y }))) {
            dupes.push(JSON.stringify({ x, y }));
          }
          points.push(JSON.stringify({ x, y }));
        }
      } else if (line[0].x > line[1].x && line[0].y > line[1].y) {
        for (let x = line[0].x, y = line[0].y; x > line[1].x - 1, y > line[1].y - 1; x--, y--) {
          if (points.includes(JSON.stringify({ x, y }))) {
            dupes.push(JSON.stringify({ x, y }));
          }
          points.push(JSON.stringify({ x, y }));
        }
      } else if (line[0].x < line[1].x && line[0].y < line[1].y) {
        for (let x = line[0].x, y = line[0].y; x < line[1].x + 1, y < line[1].y + 1; x++, y++) {
          if (points.includes(JSON.stringify({ x, y }))) {
            dupes.push(JSON.stringify({ x, y }));
          }
          points.push(JSON.stringify({ x, y }));
        }
      } else if (line[0].x < line[1].x && line[0].y > line[1].y) {
        for (let x = line[0].x, y = line[0].y; x < line[1].x + 1, y > line[1].y - 1; x++, y--) {
          if (points.includes(JSON.stringify({ x, y }))) {
            dupes.push(JSON.stringify({ x, y }));
          }
          points.push(JSON.stringify({ x, y }));
        }
      }
    });
    console.log(`Part 2 answer: ${[...new Set(dupes)].length}`);
  }
});
