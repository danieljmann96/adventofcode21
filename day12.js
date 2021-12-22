const read = require('read-file');

read('day12input.txt', 'utf8', function (err, buffer) {
  if (err) {
    console.error(err);
  } else {
    //const rows = buffer.split('\n');
    const rows = ['start-A', 'start-b', 'A-c', 'A-b', 'b-d', 'A-end', 'b-end'];
    console.log(rows);
  }
});
