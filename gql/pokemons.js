import {gql} from 'apollo-boost';

const POKEMONS = gql`
  query getPokemons($first: Int!) {
    pokemons(first: $first) {
      id
      name
      image
      types
      number
      classification
      weaknesses
      resistant
    }
  }
`;

export default POKEMONS;
