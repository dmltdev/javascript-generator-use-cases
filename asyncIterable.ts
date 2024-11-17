async function* getSwapiPagerator(endpoint) {
  let nextUrl = `https://swapi.dev/api/${endpoint}`;

  while (nextUrl) {
    const response = await fetch(nextUrl);
    const data = await response.json();
    nextUrl = data.next;
    yield* data.results;
  }
}

const starWars = {
  characters: {
    [Symbol.asyncIterator]: () => getSwapiPagerator("people"),
  },
  planets: {
    [Symbol.asyncIterator]: () => getSwapiPagerator("planets"),
  },
  starships: {
    [Symbol.asyncIterator]: () => getSwapiPagerator("starships"),
  },
};

async function getCharacters() {
  const data: string[] = [];

  for await (const page of starWars.characters) {
    console.log(page.name);
    data.push(page.name);
  }

  return data;
}

(async () => {
  const characters = await getCharacters();
  console.log(characters);
})();

export {};
