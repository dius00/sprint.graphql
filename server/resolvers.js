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
      const type = args.type.toLowerCase();
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
  Mutation: {
    DeletePokemon(parents, args) {
      let toDelete;
      if (args.id)
        toDelete = data.pokemon.find(
          (pokemon) => Number(pokemon.id) === Number(args.id)
        );
      if (args.name)
        toDelete = data.pokemon.find((pokemon) => pokemon.name === args.name);
      const deleteIndex = data.pokemon.indexOf(toDelete);
      data.pokemon.splice(deleteIndex, 1);
      return `${toDelete.name} has been deleted`;
    },

    DeleteType(parents, args) {
      let toDelete;
      const deleteIndex = data.types.indexOf(args.name);
      if (deleteIndex > -1) {
        toDelete = data.types.splice(deleteIndex, 1);
        return `${toDelete} has been deleted`;
      } else return "Nothing has been deleted";
    },

    DeleteAttack(parents, args) {
      const toDelete = args.name;
      const fast = data.attacks.fast.find((attack) => attack.name === toDelete);
      if (fast) {
        const deleteIndex = data.attacks.fast.indexOf(fast);
        data.attacks.fast.splice(deleteIndex, 1);
        return `${toDelete} has been deleted`;
      }
      const special = data.attacks.special.find(
        (attack) => attack.name === toDelete
      );
      if (special) {
        const deleteIndex = data.attacks.special.indexOf(special);
        data.attacks.special.splice(deleteIndex, 1);
        return `${toDelete} has been deleted`;
      }
      return `nothing has been deleted`;
    },

    AddPokemon(parents, args) {
      data.pokemon.push(args.input);
      return `${args.input.name} has been added`;
    },

    PatchPokemon: (parent, args) => {
      const poke = data.pokemon.find((pokemon) => pokemon.name === args.name);
      if (poke) {
        for (const key of Object.keys(args.input)) {
          if (args.input[key]) poke[key] = args.input[key];
        }
        return poke;
      } else return poke;
    },

    AddType(parents, args) {
      data.types.push(args.name);
      return `${args.name} has been added`;
    },

    PatchType(parents, args) {
      const index = data.types.indexOf(args.replace);
      if (index > -1) data.types.splice(index, 1, args.name);
      else if (index === -1) return `${args.replace} not found`;
      return `${args.replace} has been replaced to ${args.name}`;
    },

    AddAttack(parents, args) {
      const type = args.type.toLowerCase();
      if (type === "fast") data.attacks.fast.push(args.input);
      if (type === "special") data.attacks.special.push(args.input);
      return `${args.input.name} has been added`;
    },
    PatchAttack(parents, args) {
      const toPatch = args.name;
      const fast = data.attacks.fast.find((attack) => attack.name === toPatch);
      if (fast) {
        for (const key of Object.keys(fast)) {
          if (args.input[key]) fast[key] = args.input[key];
        }
        return `${toPatch} has been modified`;
      }
      const special = data.attacks.special.find(
        (attack) => attack.name === toPatch
      );
      if (special) {
        for (const key of Object.keys(special)) {
          if (args.input[key]) special[key] = args.input[key];
        }
        return `${toPatch} has been modified`;
      }
      return `nothing has been modified`;
    },
  },
};
