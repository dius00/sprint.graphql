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
    Pokemon(name: String, id: Int): Pokemon
    Types: PokeTypes
    Type(name: String): [Pokemon]
    Attacks(type: String): [Attack]
    Attack(name: String): [Pokemon]
  }

  input WeightHeightInput {
    minimum: String
    maximum: String
  }

  input EvolReqInput {
    amount: Int
    name: String
  }

  input AtkClInput {
    fast: [AttackInput]
    special: [AttackInput]
  }

  input AttackInput {
    name: String
    type: String
    damage: Int
  }

  input IdNameInput {
    id: Int!
    name: String!
  }

  input Pokeinput {
    id: String!
    name: String!
    classification: String!
    types: [String!]
    resistant: [String!]
    weaknesses: [String!]
    weight: WeightHeightInput!
    height: WeightHeightInput!
    fleeRate: Float!
    evolutionRequirements: EvolReqInput!
    evolutions: [IdNameInput!]
    maxCP: Int!
    maxHP: Int!
    attacks: AtkClInput!
  }

  input PokePatch {
    id: String
    name: String
    classification: String
    types: [String]
    resistant: [String]
    weaknesses: [String]
    weight: WeightHeightInput
    height: WeightHeightInput
    fleeRate: Float
    evolutionRequirements: EvolReqInput
    evolutions: [IdNameInput]
    maxCP: Int
    maxHP: Int
    attacks: AtkClInput
  }

  type Mutation {
    DeletePokemon(name: String, id: Int): String
    AddPokemon(input: PokePatch): String
    PatchPokemon(name: String, input: PokePatch): Pokemon

    DeleteType(name: String): String
    AddType(name: String!): String
    PatchType(name: String, replace: String): String

    DeleteAttack(name: String): String
    PatchAttack(name: String, input: AttackInput): String
    AddAttack(type: String, input: AttackInput!): String
  }
`;

module.exports = typeDefs;
