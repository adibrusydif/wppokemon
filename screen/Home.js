/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {useQuery} from '@apollo/react-hooks';
import POKEMONS from '../gql/pokemons';
const {width, height} = Dimensions.get('window');
const screen_width = width < height ? width : height;
const screen_height = width < height ? height : width;

function Home(props) {
  const [variables, setVariables] = React.useState({first: 20});
  const {loading, error, data, fetchMore} = useQuery(POKEMONS, {
    variables,
  });
  const {navigate} = props.navigation;

  const pokemonExists = data && data.pokemons;

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigate('Detail', {id: item.id, name: item.name})}>
        <View>
          <Text style={styles.pokemonName}>{item.name}</Text>
          {item.types.map((type, index) => (
            <Text style={styles.badgeType}>{type}</Text>
          ))}
        </View>
        <Image
          style={styles.imageCharacter}
          source={{
            uri: item.image,
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.wrapperTitle}>
        <Text style={styles.titleHome}>Pokedex</Text>
      </View>
      <FlatList
        testID="FlatList"
        contentContainerStyle={styles.flatlist}
        showsHorizontalScrollIndicator={false}
        data={pokemonExists ? data.pokemons : []}
        renderItem={renderItem}
        numColumns={2}
      />
      {loading && (
        <View>
          <Text>Loading ...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#34edac',
    borderRadius: 6,
    padding: 10,
    width: screen_width / 2 - 20,
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pokemonName: {fontWeight: 'bold', fontSize: 16},
  flatlist: {paddingHorizontal: 10},
  wrapperTitle: {padding: 20},
  wrapper: {backgroundColor: Colors.white, flex: 1},
  titleHome: {fontSize: 20, fontWeight: '700'},
  imageCharacter: {
    alignItems: 'flex-end',
    height: 80,
    width: 80,
  },
  badgeType: {
    fontWeight: '200',
    fontSize: 10,
    backgroundColor: '#34edac',
    color: Colors.white,
    padding: 4,
    borderRadius: 3,
    marginVertical: 3,
  },
});

export default Home;
