import React from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const screen_width = width < height ? width : height;
export const screen_height = width < height ? height : width;

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

export const dynamicTypeFilter = arr => {
  const temp = arr.map(item => item.types).flat();
  let x = temp.filter((v, i) => temp.indexOf(v) === i);
  const array = ['All'];
  return array.concat(x);
};

export const Badge = ({data, BGcolor, TxtColor}) => {
  return (
    <View style={styles.row}>
      {data.map((type, index) => (
        <Text
          key={index}
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
  wrapper: {backgroundColor: '#ffffff', flex: 1},
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
    color: '#ffffff',
    padding: 4,
    borderRadius: 3,
    marginVertical: 3,
    marginRight: 3,
    alignSelf: 'flex-start',
  },
  row: {flexDirection: 'row'},
});
