import {createAsyncThunk} from '@reduxjs/toolkit';
import {signIn} from '../../services/auth';

export const signInThunk = createAsyncThunk<
  string,
  {username: string; password: string; navigate: () => void}
>('auth/signIn', async data => {
  try {
    const payload = await signIn(data);
    // data.navigate();
    return payload;
  } catch (error) {
    console.error(error);
    throw error;
  }
});
