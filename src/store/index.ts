import {configureStore} from '@reduxjs/toolkit';
import {useDispatch, useSelector} from 'react-redux';
import authReducer from './slices/auth.slice';
import homeReducer from './slices/home.slice';

//Import your slices and reducers here

const store = configureStore({
  reducer: {
    authReducer,
    homeReducer,
  },
});

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
