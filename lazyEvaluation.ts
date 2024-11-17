// Generators allow lazy evaluation and infinite sequences
// Note that generators are consumed when iterated over, so you can't iterate over them twice

function* infinityAndBeyond() {
  let i = 1;
  while (true) {
    yield i++;
  }
}

const generator = infinityAndBeyond();

function* take(n: number, iterable: Iterable<number>) {
  for (const item of iterable) {
    if (n <= 0) return;
    n--;
    yield item;
  }
}

const taken = [...take(5, infinityAndBeyond())];
console.log(taken);

function* map(iterable: Iterable<number>, mapFn: (n: number) => number) {
  for (const item of iterable) {
    yield mapFn(item);
  }
}

const squares = [...map(take(5, infinityAndBeyond()), (n) => n * n)];
console.log(squares);
