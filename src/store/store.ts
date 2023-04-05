import { configureStore, ThunkAction, Action, Store } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import productReducer from '../slices/productSlice'

export const store: Store = configureStore({
  reducer: {
    auth: authReducer,
	product: productReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;


