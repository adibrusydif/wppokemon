import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

function DynamicFilter({route, navigation}) {
  const {filterType, callback} = route.params;

  const onSelected = param => {
    callback(param);
    navigation.goBack();
  };

  return (
    <View>
      {filterType.map((item, index) => (
        <TouchableOpacity style={styles.item} onPress={() => onSelected(item)}>
          <Text style={styles.textItem}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomColor: '#b5b7ba',
    borderBottomWidth: 1,
  },
  textItem: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default DynamicFilter;
