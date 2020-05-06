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
} from 'react-native';
import {useQuery} from '@apollo/react-hooks';
import POKEMONS from '../gql/pokemons';
import {
  Badge,
  getColor,
  screen_width,
  dynamicTypeFilter,
} from '../utils/common';

function Home(props) {
  const [variables, setVariables] = React.useState({first: 20});
  const [filterState, setFilterState] = React.useState('All');
  const {loading, error, data, fetchMore} = useQuery(POKEMONS, {
    variables,
  });
  const {navigate} = props.navigation;
  const pokemonExists = data && data.pokemons;

  const loadMore = () => {
    fetchMore({
      variables: {...variables, first: variables.first + 6},
      updateQuery: (prev, {fetchMoreResult, variables}) => {
        setVariables(variables);
        if (!fetchMoreResult) {
          return prev;
        }
        return Object.assign({}, prev, {
          pokemons: [...fetchMoreResult.pokemons],
        });
      },
    });
  };

  const datafilter = param => {
    if (filterState && filterState !== 'All') {
      const filterItem = data.pokemons.filter(item =>
        item.types.includes(filterState),
      );
      return filterItem;
    } else {
      return param;
    }
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={[styles.card, {borderColor: getColor(item.types)}]}
        onPress={() => navigate('Detail', {id: item.id, name: item.name})}>
        <View>
          <Text style={styles.pokemonName}>{item.name}</Text>
          <Badge
            data={item.types}
            TxtColor={'#ffffff'}
            BGcolor={getColor(item.types)}
          />
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

  const datawrap = pokemonExists ? datafilter(data.pokemons) : [];

  return (
    <View style={styles.wrapper}>
      {!loading || pokemonExists ? (
        <View>
          <View style={styles.wrapperTitle}>
            <View>
              <Text style={[styles.titleHome, {flex: 1}]}>Pokedex</Text>
            </View>

            <TouchableOpacity
              onPress={() =>
                navigate('Filter', {
                  filterType: dynamicTypeFilter(data.pokemons),
                  callback: x => setFilterState(x),
                })
              }>
              <Text style={styles.titleFilter}>Filter : {filterState}</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            testID="FlatList"
            contentContainerStyle={styles.flatlist}
            showsHorizontalScrollIndicator={false}
            data={datawrap}
            renderItem={renderItem}
            onEndReached={() => loadMore()}
            onEndReachedThreshold={0.5}
            numColumns={2}
            keyExtractor={(item, index) => index}
          />
        </View>
      ) : (
        <View style={styles.center}>
          <Image
            style={styles.imageCharacter}
            source={require('../images/Pokeball.png')}
          />
          {error ? (
            <Text>Something error, please restart your apps</Text>
          ) : (
            <Text>Loading ...</Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  wrapperTitle: {
    padding: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  wrapper: {backgroundColor: '#ffffff', flex: 1},
  titleHome: {fontSize: 20, fontWeight: '700'},
  titleFilter: {
    fontSize: 16,
    fontWeight: '500',
    backgroundColor: '#d9dbde',
    padding: 4,
    borderRadius: 3,
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  imageCharacter: {
    alignItems: 'flex-end',
    height: 80,
    width: 80,
  },
  badgeType: {
    fontWeight: '200',
    fontSize: 10,
    backgroundColor: '#34edac',
    color: '#ffffff',
    padding: 4,
    borderRadius: 3,
    marginVertical: 3,
    marginRight: 3,
    alignSelf: 'flex-start',
  },
});

export default Home;
