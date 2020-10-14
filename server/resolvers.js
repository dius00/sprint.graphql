// The data below is mocked.
const data = require("./data");

module.exports = {
  Query: {
    Pokemons: () => {
      return data.pokemon;
    },
    Pokemon: (parent, args) => {
      if (args.id)
        return data.pokemon.find(
          (pokemon) => Number(pokemon.id) === Number(args.id)
        );
      if (args.name)
        return data.pokemon.find((pokemon) => pokemon.name === args.name);
    },
    Types: () => {
      return data;
    },
    Type: (parent, args) => {
      const type = args.name;
      return data.pokemon.filter((poke) => poke.types.includes(type));
    },
    Attacks: (parent, args) => {
      const type = args.types.toLowerCase();
      if (type === "fast") return data.attacks.fast;
      if (type === "special") return data.attacks.special;
    },
    Attack: (parent, args) => {
      const name = args.name;
      const result = [];
      data.pokemon.forEach((poke) => {
        if (poke.attacks.fast) {
          for (const attack of poke.attacks.fast)
            if (attack.name === name) result.push(poke);
        }
        if (poke.attacks.special) {
          for (const attack of poke.attacks.special)
            if (attack.name === name) result.push(poke);
        }
      });
      return result;
    },
  },
};
