// yield is a two-way street:
// 1) you can send values OUT of the generator (using yield)
// 2) you can send values back IN to the generator (using .next())
// yield* is a one-way street:
// you can only send values OUT of the generator (using yield*)

// It's called "one-way street" because:
// 1) It only delegates/forwards values from another generator
// 2) You cannot send values back into the delegated generator during the yield* operation

function* listener() {
  console.log("Listening...");
  while (true) {
    const msg: string = yield;
    console.log("heard: ", msg);
  }
}

const l = listener();
l.next("are you there?");
l.next("how about now?");
l.next("hello?");

// Generators remember state, so they can be used as state machines.
function* bankAccount(): Generator<number> {
  let balance = 0;

  while (balance >= 0) {
    balance += yield balance;
  }

  return "bankrupt";
}

const acct = bankAccount();
console.log(acct.next());
console.log(acct.next(50));
console.log(acct.next(-10));
console.log(acct.next(-60));
