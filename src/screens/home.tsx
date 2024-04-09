import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useAppDispatch, useAppSelector} from '../store';
import {categoriesThunk} from '../store/middlewares/home.thunk';
import {getCategoriyItem} from '../services/products';
import ProductCard from '../components/product';
import Slider from '../components/Slider';
import {
  setAllProducts,
  setSearchQuery,
  setToShowheaderTop,
} from '../store/slices/home.slice';

// Define types for your navigation and product
type RootStackParamList = {
  Category: string;
};

type CategoryData = {
  categoryName: string;
  products: Product[];
};

interface Product {
  id: string;
  name: string;
  price: string;
  thumbnail: string; // Assuming these are the fields you have; adjust as necessary
}

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList>;

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(state => state.homeReducer.data);
  const [data, setData] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(categoriesThunk());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSearchQuery(''));
    dispatch(setToShowheaderTop());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchCategoryData = async () => {
      setLoading(true);
      const fetchedData: CategoryData[] = [];
      const allProducts = [];
      for (const category of categories) {
        const categoryData = await getCategoriyItem(category);
        fetchedData.push({
          categoryName: category,
          products: categoryData.products.slice(0, 4),
        });
        allProducts.push(...categoryData.products);
      }
      setData(fetchedData);
      dispatch(setAllProducts(allProducts));
      setLoading(false);
    };

    if (categories.length > 0) {
      fetchCategoryData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  const renderFooter = () => {
    if (!loading) {
      return null;
    }
    return (
      <View style={{paddingVertical: 20}}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  };

  const renderProductItem = ({item}: {item: Product}) => (
    <ProductCard product={item} />
  );

  const renderCategory = ({item}: {item: CategoryData}) => (
    <View>
      {item?.products?.[0]?.id === data?.[0]?.products?.[0]?.id && <Slider />}
      <View style={styles.categoryContainerHeader}>
        <Text style={styles.categoryTitle}>
          {item.categoryName.toUpperCase()}
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Category', {
              categoryName: item.categoryName,
            })
          }>
          <Text style={styles.categoryLink}>SEE ALL</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={item.products}
        renderItem={renderProductItem}
        keyExtractor={item => item.id}
        horizontal={false}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
      />
      <View style={styles.line} />
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderCategory}
      keyExtractor={(item, index) => item.categoryName + index}
      ListFooterComponent={renderFooter}
    />
  );
};

// Add or update your StyleSheet
const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 14,
    paddingTop: 14,
  },
  categoryContaine: {
    alignItems: 'center',
  },
  categoryContainerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    width: '95%',
    paddingLeft: '2.5%',
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  categoryLink: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#7867BE',
    textDecorationLine: 'underline',
  },
  line: {
    borderBottomColor: '#DFDFDF',
    borderBottomWidth: 1,
    marginVertical: 20,
    width: '95%',
    marginLeft: '2.5%',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 14,
  },
});

export default HomeScreen;
