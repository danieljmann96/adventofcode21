const read = require('read-file');

class Octopus {
  x;
  y;
  energy;
  flashing;
  wasFlashing;
  flashCount;
  stopCounting;
  constructor(x, y, energy) {
    this.x = x;
    this.y = y;
    this.energy = energy;
    this.flashing = false;
    this.wasFlashing = false;
    this.flashCount = 0;
    this.stopCounting = false;
  }
  increaseEnergy() {
    if (!this.wasFlashing) {
      this.energy++;
      if (this.energy > 9) {
        this.flashing = true;
        this.energy = 0;
        if (!this.stopCounting) {
          this.flashCount++;
        }
      }
    }
  }
  stopFlashing() {
    this.flashing = false;
    this.wasFlashing = true;
  }
  clear() {
    this.flashing = false;
    this.wasFlashing = false;
  }
  setStopCounting() {
    this.stopCounting = true;
  }
}

read('day11input.txt', 'utf8', function (err, buffer) {
  if (err) {
    console.error(err);
  } else {
    const rows = buffer.split('\n').map(x => x.split('').filter(a => a !== '\r'));
    const octs = rows
      .reverse()
      .map((row, y) => row.map((energy, x) => new Octopus(x, y, energy)))
      .flat();
    function getAdjacentsNotFlashing(oct) {
      return octs
        .filter(x => !x.flashing)
        .filter(
          o =>
            (o.x === oct.x - 1 && o.y === oct.y) ||
            (o.x === oct.x - 1 && o.y === oct.y + 1) ||
            (o.x === oct.x && o.y === oct.y + 1) ||
            (o.x === oct.x + 1 && o.y === oct.y + 1) ||
            (o.x === oct.x + 1 && o.y === oct.y) ||
            (o.x === oct.x + 1 && o.y === oct.y - 1) ||
            (o.x === oct.x && o.y === oct.y - 1) ||
            (o.x === oct.x - 1 && o.y === oct.y - 1)
        )
        .map(a => {
          return { x: a.x, y: a.y };
        });
    }
    let finalStep = 0;
    for (let step = 1; step < Infinity; step++) {
      octs.forEach(oct => {
        oct.increaseEnergy();
      });
      while (octs.filter(x => x.flashing).length > 0) {
        octs.forEach(oct => {
          if (oct.flashing) {
            getAdjacentsNotFlashing(oct).forEach(adj => {
              octs.find(o => adj.x === o.x && adj.y === o.y).increaseEnergy();
            });
            oct.stopFlashing();
          }
        });
      }
      if (octs.filter(oct => oct.wasFlashing).length === octs.length) {
        finalStep = step;
        break;
      }
      octs.forEach(oct => {
        oct.clear();
        if (step === 100) {
          //For part 1 answer
          oct.setStopCounting();
        }
      });
    }
    console.log(`Part 1 answer: ${octs.reduce((a, b) => a + b.flashCount, 0)}`);
    console.log(`Part 2 answer: ${finalStep}`);
  }
});
