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
  Image,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useQuery} from '@apollo/react-hooks';
import POKEMON from '../gql/pokemon';
import {Badge, getColor, screen_width, screen_height} from '../utils/common';

function Detail({route, navigation}) {
  const {id, name} = route.params;
  const {loading, error, data} = useQuery(POKEMON, {
    variables: {id, name},
  });
  const {navigate} = navigation;

  const pokemonExists = data && data.pokemon;

  return (
    <ScrollView style={styles.scrollStyle}>
      {loading && (
        <View style={styles.center}>
          <Image
            style={styles.imageCharacterTile}
            source={require('../images/Pokeball.png')}
          />
          {error ? (
            <Text>Something error, please restart your apps</Text>
          ) : (
            <Text>Loading ...</Text>
          )}
        </View>
      )}

      {pokemonExists && (
        <>
          <View style={styles.wrapperHeader}>
            <Text style={styles.titleHome}>{data.pokemon.name}</Text>
            <Badge
              data={data.pokemon.types}
              TxtColor={'#ffffff'}
              BGcolor={getColor(data.pokemon.types)}
            />
            <Image
              style={styles.imageCharacter}
              source={{
                uri: data.pokemon.image,
              }}
            />
          </View>
          <View
            style={[
              styles.cardBottom,
              {borderColor: getColor(data.pokemon.types)},
            ]}>
            <View style={styles.margin10}>
              <Text style={styles.textkey}>Classification</Text>
              <Text style={styles.textValue}>
                {data.pokemon.classification}
              </Text>
            </View>
            <View style={styles.wrapperData}>
              <View>
                <Text style={styles.textkey}>Max HP</Text>
                <Text style={styles.textValue}>{data.pokemon.maxHP}</Text>
              </View>
              <View>
                <Text style={styles.textkey}>Max CP</Text>
                <Text style={styles.textValue}>{data.pokemon.maxCP}</Text>
              </View>
              <View>
                <Text style={styles.textkey}>fleeRate</Text>
                <Text style={styles.textValue}>{data.pokemon.fleeRate}</Text>
              </View>
            </View>
            <View style={styles.margin10}>
              <Text style={styles.textkey}>Resistance</Text>
              <Badge
                data={data.pokemon.resistant}
                TxtColor={'#ffffff'}
                BGcolor={'#7a786f'}
              />
            </View>
            <View style={styles.margin10}>
              <Text style={styles.textkey}>Weaknesses</Text>
              <Badge
                data={data.pokemon.weaknesses}
                TxtColor={'#ffffff'}
                BGcolor={'#7a786f'}
              />
            </View>
            <Text style={styles.textkey}>Evolutions</Text>
            <View style={styles.row}>
              {data.pokemon.evolutions
                ? data.pokemon.evolutions.map(item => (
                    <TouchableOpacity
                      style={[styles.card, {borderColor: getColor(item.types)}]}
                      onPress={() =>
                        navigate('Detail', {id: item.id, name: item.name})
                      }>
                      <View>
                        <Text style={styles.pokemonName}>{item.name}</Text>
                        <Badge
                          data={item.types}
                          BGcolor={getColor(item.types)}
                          TxtColor={'#ffffff'}
                        />
                      </View>
                      <Image
                        style={styles.imageCharacterTile}
                        source={{
                          uri: item.image,
                        }}
                      />
                    </TouchableOpacity>
                  ))
                : null}
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  margin10: {marginBottom: 10},
  scrollStyle: {backgroundColor: '#ffffff', flex: 1},
  wrapperHeader: {flex: 1, padding: 20, marginTop: 40},
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: screen_height / 2 - 40,
  },
  badgeType: {
    fontWeight: '200',
    fontSize: 10,
    backgroundColor: '#34edac',
    color: '#ffffff',
    padding: 4,
    borderRadius: 3,
    marginVertical: 3,
    alignSelf: 'flex-start',
  },
  wrapperData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  cardBottom: {
    flex: 1,
    borderWidth: 2,
    height: 400,
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  textkey: {
    paddingLeft: 5,
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(47, 54, 64, 0.60)',
  },
  textValue: {
    paddingLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  titleHome: {fontSize: 24, fontWeight: '700'},
  imageCharacter: {
    flex: 1,
    width: '100%',
    height: 400,
  },
  imageCharacterTile: {
    alignItems: 'flex-end',
    height: 75,
    width: 75,
  },
  pokemonName: {fontWeight: 'bold', fontSize: 16},

  card: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    width: screen_width / 2 - 30,
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {flexDirection: 'row'},
});

export default Detail;
