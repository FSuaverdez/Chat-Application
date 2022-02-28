import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../services/authApi';
import { conversationApi } from '../services/conversationApi';
import { authSlice } from '../slices/authSlice';

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [conversationApi.reducerPath]: conversationApi.reducer,
    user: authSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      conversationApi.middleware
    ),
});

export default store;
