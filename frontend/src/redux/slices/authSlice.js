import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));
const token = localStorage.getItem('authToken');
const tempUserId = sessionStorage.getItem('tempUserId'); // Get tempUserId from sessionStorage

const initialState = {
  user: user || null,
  token: token || null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
  tempUserId: tempUserId || null, // For OTP verification - restored from sessionStorage
  tempResetUserId: null, // For password reset
};

// Signup
export const signup = createAsyncThunk(
  'auth/signup',
  async (userData, thunkAPI) => {
    try {
      return await authService.signup(userData);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Signup failed';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Verify OTP
export const verifyOTP = createAsyncThunk(
  'auth/verifyOTP',
  async (otpData, thunkAPI) => {
    try {
      return await authService.verifyOTP(otpData);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'OTP verification failed';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Resend OTP
export const resendOTP = createAsyncThunk(
  'auth/resendOTP',
  async (userId, thunkAPI) => {
    try {
      return await authService.resendOTP(userId);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Failed to resend OTP';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      return await authService.login(credentials);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Login failed';
      const userId = error.response?.data?.userId; // Capture userId for unverified accounts
      return thunkAPI.rejectWithValue({ message, userId });
    }
  }
);

// Forgot Password
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (identifier, thunkAPI) => {
    try {
      return await authService.forgotPassword(identifier);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Request failed';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Reset Password
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (resetData, thunkAPI) => {
    try {
      return await authService.resetPassword(resetData);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Password reset failed';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Logout
export const logout = createAsyncThunk('auth/logout', async () => {
  authService.logout();
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    clearTempUserId: (state) => {
      state.tempUserId = null;
      sessionStorage.removeItem('tempUserId');
    },
    clearTempResetUserId: (state) => {
      state.tempResetUserId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tempUserId = action.payload.data.userId;
        state.message = action.payload.message;
        // Persist to sessionStorage so it survives navigation
        sessionStorage.setItem('tempUserId', action.payload.data.userId);
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Verify OTP
      .addCase(verifyOTP.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.data.user;
        state.token = action.payload.data.token;
        state.tempUserId = null;
        state.message = action.payload.message;
        // Clear tempUserId from sessionStorage after successful verification
        sessionStorage.removeItem('tempUserId');
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Resend OTP
      .addCase(resendOTP.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resendOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(resendOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.data.user;
        state.token = action.payload.data.token;
        state.message = action.payload.message;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message || action.payload;
        state.user = null;
        state.token = null;
        // If userId is provided, it means account is unverified
        console.log('login.rejected - payload:', action.payload);
        if (action.payload?.userId) {
          console.log('Setting tempUserId to:', action.payload.userId);
          state.tempUserId = action.payload.userId;
          // Persist to sessionStorage so it survives navigation
          sessionStorage.setItem('tempUserId', action.payload.userId);
        }
      })
      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tempResetUserId = action.payload.data.userId;
        state.message = action.payload.message;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tempResetUserId = null;
        state.message = action.payload.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.tempUserId = null;
        state.tempResetUserId = null;
      });
  },
});

export const { reset, clearTempUserId, clearTempResetUserId } = authSlice.actions;
export default authSlice.reducer;