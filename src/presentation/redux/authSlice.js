import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthService } from '../../infrastructure/services/authServices';
import { getToken } from '../../domain/useCases/getToken';
import { decodeTonken } from '../../core/utils/jwt';

const authSerivce = new AuthService();

export const fetchToken = createAsyncThunk(
  'auth/fetchToken',
  async (_, { dispatch }) => {
    const data = await getToken(authSerivce);
    const decoded = decodeTonken(data.token);
    if (isTokenExpired(decoded.exp)) {
      return rejectWithValue('Token expirado');
    }
    return {
      token: data.token,
      expiresAt: decoded.exp,
    };
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    expiresAt: null,
    loading: false,
  },
  reducers: {
    logout(state) {
      state.token = null;
      state.expiresAt = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchToken.pending, state => {
        state.loading = true;
      })
      .addCase(fetchToken.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.expiresAt = action.payload.expiresAt;
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
