// Generator function
function* genFunction() {
  yield "hello world";
}

// Generator object
let genObject = genFunction();

console.log(genObject.next());
console.log(genObject.next());

// .next() advances; .yield() pauses; .return() ends; .throw() errors

function* loggerator() {
  console.log("running");
  yield "paused";
  console.log("running again");
  return "stopped";
}

let logger = loggerator();

logger.next(); //?
logger.next(); //?

// Generators are iterators

function* abcs() {
  yield "a";
  yield "b";
  yield "c";
}

for (let letter of abcs()) {
  console.log(letter.toUpperCase());
}

// You can spread a generator into an array
const letters = [...abcs()];
console.log(letters);
