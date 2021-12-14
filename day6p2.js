const read = require('read-file');

read('day6input.txt', 'utf8', function (err, buffer) {
  if (err) {
    console.error(err);
  } else {
    let currentFish = buffer.split(',').map(x => Number(x));
    let initialState = new Array();
    for (let i = 0; i < 9; ++i) initialState[i] = 0;
    currentFish.forEach(element => {
      initialState[element]++;
    });
    for (let i = 0; i < 256; i++) {
      let dayZero = initialState[0];
      let dayOne = initialState[1];
      let dayTwo = initialState[2];
      let dayThree = initialState[3];
      let dayFour = initialState[4];
      let dayFive = initialState[5];
      let daySix = initialState[6];
      let daySeven = initialState[7];
      let dayEight = initialState[8];
      initialState[0] = dayOne;
      initialState[1] = dayTwo;
      initialState[2] = dayThree;
      initialState[3] = dayFour;
      initialState[4] = dayFive;
      initialState[5] = daySix;
      initialState[6] = daySeven + dayZero;
      initialState[7] = dayEight;
      initialState[8] = dayZero;
    }
    console.log(`Part 2 answer: ${initialState.reduce((a, b) => a + b)}`);
  }
});
