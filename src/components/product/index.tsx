import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import WishlistIconRed from '../../assets/wishlist_icon_red.png';
import WishlistIcon from '../../assets/wishlist_icon.png';
import StarIcon from '../../assets/star.png';
import {useAppDispatch} from './../../store/index';
import {removeFromWishlist, setToWishlist} from '../../store/slices/home.slice';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  images: string[];
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}

interface ProductCardProps {
  product: Product;
  follow?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({product, follow}) => {
  const dispatch = useAppDispatch();
  const [isWishlist, setIsWishlist] = useState<boolean>(follow || false);

  const handleWishlistPress = item => () => {
    setIsWishlist(!isWishlist);
    // onWishlistPress(id, !isWishlist);
    if (!isWishlist) {
      dispatch(setToWishlist(item));
    } else {
      dispatch(removeFromWishlist(item.id));
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{uri: product?.thumbnail}} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{product?.title}</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.rateContainner}>
          <Image source={StarIcon} style={styles.rateIcon} />
          <Text style={styles.rate}>{product?.rating}</Text>
        </View>
        <Text style={styles.price}>{product?.price}$</Text>
      </View>
      <TouchableOpacity
        onPress={handleWishlistPress(product)}
        style={styles.wishlistButton}>
        <Image
          source={isWishlist ? WishlistIconRed : WishlistIcon}
          style={styles.wishlistIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  image: {
    borderRadius: 10,
    width: '96%',
    height: 164,
    marginBottom: 10,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '95%',
    marginBottom: 14,
  },
  info: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rateIcon: {
    height: 16,
    width: 16,
  },
  rate: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 14,
  },
  rateContainner: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Gotham',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 14,
  },
  price: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 17,
    textAlign: 'center',
  },
  wishlistButton: {
    padding: 5,
    position: 'absolute',
    right: 20,
    top: 10,
  },
  wishlistIcon: {
    width: 20,
    height: 20,
  },
});

export default ProductCard;
