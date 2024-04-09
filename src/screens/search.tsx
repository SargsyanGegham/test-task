import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../store';
import {
  setToShowheaderTop,
  setSearchQuery,
  setToHideheaderTop,
} from '../store/slices/home.slice';
import {FlatList} from 'react-native-gesture-handler';
import ProductCard from '../components/product';
import {StyleSheet, Text, View} from 'react-native';

interface Product {
  id: string;
  name: string;
  price: string;
  thumbnail: string;
}

const SearchScreen = () => {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector(state => state.homeReducer.searchQuery);
  const allProducts = useAppSelector(state => state.homeReducer.allProducts);
  const [data, setdata] = useState([]);
  useEffect(() => {
    const filtered = allProducts.filter(
      item =>
        item?.title &&
        item.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setdata(filtered);
    return () => {
      dispatch(setToShowheaderTop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  useEffect(() => {
    dispatch(setSearchQuery(''));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderProductItem = ({item}: {item: Product}) => (
    <ProductCard product={item} />
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
  },
});
export default SearchScreen;
