import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CarruselRepositoryImpl } from '../../infrastructure/repositories/carruselsImp';
import { getCarrusels } from '../../domain/useCases/getCarrusel';

const repo = new CarruselRepositoryImpl();

export const fetchCarrusels = createAsyncThunk(
  'carrusel/fetchCarrusels',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getCarrusels(repo);
      return data;
    } catch (error) {
      console.log('❌ Error fetchCarrusels:', error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const carruselSlice = createSlice({
  name: 'carrusels',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCarrusels.pending, state => {
        state.loading = true;
      })
      .addCase(fetchCarrusels.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action);

        state.data = action.payload;
      })
      .addCase(fetchCarrusels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default carruselSlice.reducer;
