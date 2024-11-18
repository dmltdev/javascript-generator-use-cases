// Generators can function as coroutines: passing control back and forth between different parts of a program

// Coroutines are a way to manage concurrency and collaboration between different parts of a program
// They are similar to threads, but they are not actually threads
// They are managed by the JavaScript runtime, and they are not real threads
// They are more like lightweight threads that can be paused and resumed

type PlayerName = "knocker" | "asker" | "ping" | "pong";

export type Players = {
  [key in PlayerName]?: Generator;
};

const players: Players = {};
const queue: [PlayerName, string][] = [];

export function send(name: PlayerName, msg: string) {
  console.log(msg);
  queue.push([name, msg]);
}

export function run() {
  while (queue.length) {
    const item = queue.shift();

    if (!item) continue;
    const [name, msg] = item;

    if (!players[name]) {
      throw new Error(`Player ${name} not found`);
    }

    players[name].next(msg);
  }
}

function* knocker() {
  let question: string;
  send("asker", "Knock knock");

  question = yield;
  if (question !== "Who's there?") return;
  send("asker", "Gene");

  question = yield;
  if (question !== "Gene who?") return;

  send("asker", "Generator!");
}

function* asker() {
  const knock: string = yield;
  if (knock !== "Knock knock") return;

  send("knocker", "Who's there?");

  const answer: string = yield;
  send("knocker", `${answer} who?`);
}

players.knocker = knocker();
players.asker = asker();
send("asker", "asker get ready...");
send("knocker", "knocker go!");
run();

// Showcase: mutual recursion blows the call stack
export function getMaxCallStackSize(): number {
  try {
    return 1 + getMaxCallStackSize();
  } catch (e) {
    console.error("Error getting max call stack size", e);
    return 1;
  }
}

// function ping(n) {
//   console.log("ping", n);
//   return pong(n + 1);
// }

// function pong(n) {
//   console.log("pong", n);
//   return ping(n + 1);
// }

// RangeError: Maximum call stack size exceeded
// ping(0);

// Generators can exceed the call stack size,
// but it's safer to limit the number of iterations to prevent infinite recursion

// This is another way to estimate the iteration limit from the call stack size
// const MAX_ITERATIONS = getMaxCallStackSize() * 2;
const MAX_ITERATIONS = 20000;

// Here's a generator version of ping and pong that exceeds the call stack size (usually around 10000 iterations in the Node.js environment)
export function* ping() {
  let n: number;
  while (true) {
    n = yield;
    if (n >= MAX_ITERATIONS) return;

    console.log("ping", n);
    send("pong", `${++n}`);
  }
}

export function* pong() {
  let n: number;

  while (true) {
    n = yield;
    if (n >= MAX_ITERATIONS) return;
    console.log("pong", n);
    send("ping", `${++n}`);
  }
}

players.ping = ping();
send("ping", "get ready");
players.pong = pong();
send("pong", "get ready");

send("ping", "0");
run();
