import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CarruselRepositoryImpl } from '../../infrastructure/repositories/carruselsImp';
import { getCarrusels } from '../../domain/useCases/getCarrusel';

const repo = new CarruselRepositoryImpl();

export const fetchCarrusels = createAsyncThunk(
  'carrusel/fetchCarrusels',
  async () => {
    return await getCarrusels(repo);
  },
);

export const carruselSlice = createSlice({
  name: 'carrusel',
  initialState: {
    carrusels: [],
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
        state.carrusels = action.payload;
      })
      .addCase(fetchCarrusels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default carruselSlice.reducer;
