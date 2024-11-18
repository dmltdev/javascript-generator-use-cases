// With generators, you can create custom iterators
// This is useful for creating infinite sequences, lazy evaluation, data transformations, etc.

const cardDeck = {
  suits: ["♣️", "♠️", "♥️", "♦️"],
  court: ["J", "Q", "K", "A"],
  [Symbol.iterator]: function* () {
    for (const suit of this.suits) {
      for (let i = 2; i <= 10; i++) {
        yield suit + i;
      }
      for (const c of this.court) {
        yield suit + c;
      }
    }
  },
};

console.log([...cardDeck]);
