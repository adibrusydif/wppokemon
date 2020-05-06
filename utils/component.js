import React from 'react';
import {StyleSheet, ScrollView, View, Text, Dimensions} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const {width, height} = Dimensions.get('window');

export const screen_width = width < height ? width : height;

export const getColor = arr => {
  if (arr.includes('Fire')) {
    return '#e87272';
  } else if (arr.includes('Grass')) {
    return '#34edac';
  } else if (arr.includes('Water')) {
    return '#4dbbd1';
  } else if (arr.includes('Bug')) {
    return '#d6b745';
  } else {
    return '#7a786f';
  }
};

export const Badge = ({data, BGcolor, TxtColor}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      {data.map((type, index) => (
        <Text
          style={[
            styles.badgeType,
            {backgroundColor: BGcolor, color: TxtColor},
          ]}>
          {type}
        </Text>
      ))}
    </View>
  );
};

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
    marginRight: 3,
    alignSelf: 'flex-start',
  },
});
