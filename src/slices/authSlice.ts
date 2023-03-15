import { createAsyncThunk, createSlice, isRejectedWithValue, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import AuthService from '../services/AuthService';
import { ISignUp, IUser } from '../types/auth/User';
import { IAuth } from '../types/auth/User';
import UserService from './../services/UserService';

export interface UserState {
  user: IUser;
  isAuth: boolean;
//   status: 'loading' | 'finished' | 'error' | null
}

const initialState: UserState = {
  user: 
  	{
		id: 0,
		username: "string",
		email: "user@example.com",
		is_active: true,
		staff: true
	  }
  ,
  isAuth: false,
//   status: null
};

export const loginAsync = createAsyncThunk(
  'auth/login',
  async function (value: IAuth) {
		try {
			const response = await AuthService.login(value)
			console.log(response)
			// localStorage.setItem('token', response.data.token.access)
			setIsAuth(true)
			setUser(response.data.user)
		} catch (error: any) {
			return isRejectedWithValue(error.message)
		}
  }
)

export const registrationAsync = createAsyncThunk(
	'auth/registration',
	async function (value: ISignUp) {
		try {
			const response = await AuthService.registration(value)
			console.log(response)
			// localStorage.setItem('token', response.data.token.access)
			setUser({
				id: Date.now(),
				username: response.data.username,
				email: response.data.email
			})
		} catch (error: any) {
			return isRejectedWithValue(error.message)
		}
	}
)

export const openProfileAsync = createAsyncThunk(
	'auth/openProfile',
	async () => {
		const response = await UserService.getUser()
	}
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
	setIsAuth: (state, action: PayloadAction<boolean>) => {
		state.isAuth = action.payload;
	  },
  }
});	

export const { setUser, setIsAuth } = authSlice.actions;

export default authSlice.reducer;
