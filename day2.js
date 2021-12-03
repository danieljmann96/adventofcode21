const read = require('read-file');

read('day2input.txt', 'utf8', function (err, buffer) {
  if (err) {
    console.error(err);
  } else {
    const instructions = buffer.split('\n');
    let position = { x: 0, y: 0 };
    instructions.forEach(instruction => {
      const split = instruction.split(' ');
      switch (split[0]) {
        case 'forward':
          position.x = position.x + Number(split[1]);
          break;
        case 'down':
          position.y = position.y + Number(split[1]);
          break;
        case 'up':
          position.y = position.y - Number(split[1]);
          break;
        default:
          break;
      }
    });
    console.log(`Part 1 answer: ${position.x * position.y}`);
    let position2 = { x: 0, y: 0, a: 0 };
    instructions.forEach(instruction => {
      const split = instruction.split(' ');
      switch (split[0]) {
        case 'forward':
          position2.x = position2.x + Number(split[1]);
          position2.y = position2.y + Number(split[1]) * position2.a;
          break;
        case 'down':
          position2.a = position2.a + Number(split[1]);
          break;
        case 'up':
          position2.a = position2.a - Number(split[1]);
          break;
        default:
          break;
      }
    });
    console.log(`Part 2 answer: ${position2.x * position2.y}`);
  }
});
