import { createAsyncThunk, createSlice, isRejectedWithValue, PayloadAction } from '@reduxjs/toolkit';
import AuthService from '../services/AuthService';
import UserService from './../services/UserService';
import { ISignUp, IUser } from '../types/auth/User';
import { IAuth } from '../types/auth/User';
import axios from 'axios';
// import { AuthResponse } from './../types/auth/AuthResponse';
import { API_URL } from './../http/index';

export interface UserState {
  user: IUser;
  isAuth: boolean;
  isLoading: boolean;
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
  isLoading: true,
//   status: null
};

export const loginAsync = createAsyncThunk(
  'auth/loginAsync',
  async function (value: IAuth) {
		try {
			const response = await AuthService.login(value)
			console.log(response)
			localStorage.setItem('token', response.data.access)
			// setIsAuth(true)
		} catch (error: any) {
			return isRejectedWithValue(error.message)
		}
  }
)

export const registrationAsync = createAsyncThunk(
	'auth/registrationAsync',
	async function (value: ISignUp) {
		try {
			const response = await AuthService.registration(value)
			console.log(response)
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

export const openProfile = createAsyncThunk(
	'auth/openProfile',
	async () => {
		const response = await UserService.getUser()
		console.log(response);
		setUser(response.data)
	}
)

export const checkAuth = createAsyncThunk(
	'auth/checkAuth',
	async (refresh: string) => {
		try {
			setIsLoading(false)
			const response = await axios.post<string>(`${API_URL}/auth/token/refresh/`, refresh)
			console.log(response)
			localStorage.setItem('token', response.data)
			// setIsAuth(true)
		} catch (error: any) {
			return isRejectedWithValue(error.message)
		}
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
	setIsLoading: (state, action: PayloadAction<boolean>) => {
		state.isLoading = action.payload;
	},
  }
});	

export const { setUser, setIsAuth, setIsLoading } = authSlice.actions;

export default authSlice.reducer;
