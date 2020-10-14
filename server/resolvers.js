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

    Attacks: (parent, args) => {
      const type = args.types.toLowerCase();
      if (type === "fast") return data.attacks.fast;
      if (type === "special") return data.attacks.special;
    },
  },
};
