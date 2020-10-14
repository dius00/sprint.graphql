const { gql } = require("apollo-server");

// removde `{},` on line 149
const typeDefs = gql`
  # Your schema goes here.
  # The schema should model the full data object available!

  type Attack {
    name: String!
    type: String!
    damage: Int!
  }

  type AttackClass {
    fast: [Attack]
    special: [Attack]
  }

  type WeightandHeight {
    minimum: String!
    maximum: String!
  }

  type IdplusName {
    id: Int!
    name: String!
  }

  type EvolReq {
    amount: Int!
    name: String!
  }

  type Pokemon {
    id: String!
    name: String!
    classification: String!
    types: [String!]
    resistant: [String!]
    weaknesses: [String!]
    weight: WeightandHeight
    height: WeightandHeight
    fleeRate: Float!
    evolutionRequirements: EvolReq
    evolutions: [IdplusName]
    maxCP: Int!
    maxHP: Int!
    attacks: AttackClass
  }

  type PokeTypes {
    types: [String!]
  }

  type Query {
    Pokemons: [Pokemon]
    Pokemon(name: String, id:Int): Pokemon
    Types: PokeTypes
    Attacks(types: String): [Attack]
  }
`;

module.exports = typeDefs;
