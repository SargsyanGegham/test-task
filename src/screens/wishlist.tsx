/**
 * @file.
 * Contain Wishlist Screen.
 */
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useAppSelector} from '../store';
import ProductCard from '../components/product';

type RootStackParamList = {};

export type WishlistScreenProps = NativeStackScreenProps<RootStackParamList>;
interface Product {
  id: string;
  name: string;
  price: string;
  thumbnail: string;
}

const WishlistScreen: React.FC<WishlistScreenProps> = () => {
  const data = useAppSelector(state => state.homeReducer.wishlist);
  const renderProductItem = ({item}: {item: Product}) => (
    <ProductCard follow={true} product={item} />
  );

  return (
    <View style={styles.containner}>
      <FlatList
        data={data}
        renderItem={renderProductItem}
        keyExtractor={(item, index) => `${item.title} + ${index}`}
        onEndReachedThreshold={0.1}
        numColumns={2}
      />
      <Text>{!data.length ? 'no data' : ''}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    width: '95%',
    paddingLeft: '2.5%',
    marginTop: 30,
  },
});

export default WishlistScreen;
