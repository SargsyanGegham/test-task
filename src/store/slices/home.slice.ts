import {createSlice} from '@reduxjs/toolkit';
import {categoriesThunk} from '../middlewares/home.thunk';

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    status: 'loading',
    data: [],
    allProducts: [],
    wishlist: [],
    searchQuery: '',
    hideHeaderTop: false,
  },
  reducers: {
    setToHideheaderTop: state => {
      state.hideHeaderTop = true;
    },
    setToShowheaderTop: state => {
      state.hideHeaderTop = false;
    },

    setSearchQuery: (state, item) => {
      console.log(item, 'sdsdsdsd');
      state.searchQuery = item.payload;
    },

    setToWishlist: (state, item) => {
      state.wishlist = [...state.wishlist, item.payload];
    },

    removeFromWishlist: (state, item) => {
      state.wishlist = state.wishlist.filter(i => i.id !== item.payload);
    },

    setAllProducts: (state, item) => {
      state.allProducts = item.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(categoriesThunk.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'ready';
    });
  },
});

export const {
  setToHideheaderTop,
  setToShowheaderTop,
  setToWishlist,
  removeFromWishlist,
  setSearchQuery,
  setAllProducts,
} = homeSlice.actions;
export default homeSlice.reducer;
