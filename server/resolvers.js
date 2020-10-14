// The data below is mocked.
const data = require("./data");

module.exports = {
  Query: {
    Pokemons: () => {
      return data.pokemon;
    },
    Pokemon: (parent, args) => {
      return data.pokemon.find((pokemon) => pokemon.name === args.name);
   },
  },
};
