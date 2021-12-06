const read = require('read-file');
const columnsConst = [0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4];

class BingoNumber {
  value;
  row;
  column;
  marked = false;

  constructor(value, row, column) {
    this.value = value.includes('\r') ? value.slice(0, value.length - 1) : value;
    this.row = row;
    this.column = column;
  }
  setMarked(num) {
    this.marked = this.value === num;
  }
  adjustColumns(column) {
    this.column = column;
  }
}

class BingoCard {
  numbers;
  hasWon = false;
  winningNumber = 0;

  constructor(numbers) {
    this.numbers = numbers
      .map((row, rowNumber) =>
        row.split(' ').map((value, columnNumber) => new BingoNumber(value, rowNumber, columnNumber))
      )
      .flat()
      .filter(x => x.value !== '');
    columnsConst.forEach((col, i) => this.numbers[i].adjustColumns(col));
  }
  callNumber(num) {
    this.numbers.filter(x => !x.marked).forEach(bingoNumber => bingoNumber.setMarked(num));
    for (let i = 0; i < 5; i++) {
      if (this.numbers.filter(x => x.marked && x.row === i).length === 5) {
        this.winningNumber = num;
        this.hasWon = true;
        break;
      } else if (this.numbers.filter(x => x.marked && x.column === i).length === 5) {
        this.winningNumber = num;
        this.hasWon = true;
        break;
      }
    }
  }
  getFinalScore() {
    return (
      this.numbers.filter(x => !x.marked).reduce((prev, current) => prev + Number(current.value), 0) *
      Number(this.winningNumber)
    );
  }
}

read('day4example.txt', 'utf8', function (err, buffer) {
  if (err) {
    console.error(err);
  } else {
    const output = buffer.split('\n');
    const calls = output[0].split(',').map(x => (x.includes('\r') ? x.slice(0, x.length - 1) : x));
    let outputCards = [];
    for (let i = 2; i < output.length - 5; i += 6) {
      outputCards.push(output.slice(i, i + 5));
    }
    let cards = outputCards.map(card => new BingoCard(card));
    let winningCard;
    callsLoop: for (let callNumber = 0; callNumber < calls.length; callNumber++) {
      const call = calls[callNumber];
      for (let cardNumber = 0; cardNumber < cards.length; cardNumber++) {
        cards[cardNumber].callNumber(call);
        if (cards[cardNumber].hasWon) {
          winningCard = cards[cardNumber];
          break callsLoop;
        }
      }
    }
    console.log(`Part 1 answer: ${winningCard.getFinalScore()}`);
  }
});
