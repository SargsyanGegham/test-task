import {createAsyncThunk} from '@reduxjs/toolkit';
import {getCategories} from '../../services/products';

export const categoriesThunk = createAsyncThunk<string>(
  'home/getCategories',
  async () => {
    try {
      const payload = await getCategories();
      return payload;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
);
