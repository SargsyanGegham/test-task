import {createSlice} from '@reduxjs/toolkit';
import {signInThunk} from '../middlewares/auth.thunk';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'loading',
    profile: {},
  },
  reducers: {
    removeUser: state => {
      state.profile = {};
    },
  },
  extraReducers: builder => {
    builder.addCase(signInThunk.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.status = 'ready';
    });
  },
});

export const {removeUser} = authSlice.actions;

export default authSlice.reducer;
