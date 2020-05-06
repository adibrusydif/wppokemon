import {gql} from 'apollo-boost';

const POKEMON = gql`
  query getPokemon($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      name
      image
      classification
      resistant
      weaknesses
      types
      maxHP
      maxCP
      fleeRate
      evolutions {
        id
        name
        image
        number
        types
        maxHP
        maxCP
        evolutionRequirements {
          name
          amount
        }
      }
      number
    }
  }
`;

export default POKEMON;
