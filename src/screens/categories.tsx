/**
 * @file.
 * Contain Categories Screen.
 */
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import ProductCard from '../components/product';
import {useAppSelector} from '../store';

type RootStackParamList = {};

export type CategoriesScreenProps = NativeStackScreenProps<RootStackParamList>;

const CategoriesScreen: React.FC<CategoriesScreenProps> = () => {
  const data = useAppSelector(state => state.homeReducer.data);
  const renderProductItem = item => (
    <View style={styles.box} key={item}>
      <Text style={styles.name}>{item.toUpperCase()}</Text>
    </View>
  );

  return (
    <ScrollView>
      <View style={styles.containner}>
        {data?.map(i => renderProductItem(i))}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  containner: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    width: '95%',
    paddingLeft: '2.5%',
  },

  box: {
    flex: 1,
    height: 131,
    width: '100%',
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 25,
  },

  name: {
    fontSize: 22,
    fontWeight: '900',
    color: 'white',
  },
});

export default CategoriesScreen;
