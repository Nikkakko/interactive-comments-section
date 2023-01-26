import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getApi = createAsyncThunk('getApi', async () => {
  try {
    const { data } = await axios.get(import.meta.env.VITE_API_URL);
    return data;
  } catch (error: any) {
    console.log(error);
  }
});
