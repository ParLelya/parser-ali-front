import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import AuthService from '../services/AuthService';
import UserService, { IPatchInfo } from '../services/UserService';
import { ISignUp, IUser, IToken, IAuth } from '../types/auth/User';
import axios from 'axios';
import { API_URL } from './../http/index';
import {Cookies} from 'react-cookie'

export interface UserState {
  user: IUser;
  isAuth: boolean;
  isLoading: boolean;
  status: 'loading' | 'finished' | 'error' | null
}

export const cookies = new Cookies()

export const refreshToken = createAsyncThunk<string,string,{ rejectValue: string }>(
	'auth/refreshToken',
	async (refresh: string, {rejectWithValue}) => {
		const response = await axios.post<string>(`${API_URL}/auth/token/refresh/`, refresh)
		if (!response) {
			return rejectWithValue('Произошла ошибка авторизации')
		}
		localStorage.setItem('token', response.data)
		return response.data
	}
)

export const registration = createAsyncThunk<IUser, ISignUp,{ rejectValue: string }>(
	'auth/registration',
	async function (value, {rejectWithValue}) {
		const response = await AuthService.registration(value)
		if (!response) {
			return rejectWithValue('Произошла ошибка при регистрации')
		}
		return response.data
	}
)

export const login = createAsyncThunk<IToken,IAuth,{ rejectValue: string }>(
	'auth/login',
	async function (value: IAuth, {rejectWithValue}) {
		const response = await AuthService.login(value)
		if (!response) {
			return rejectWithValue('Произошла ошибка при входе в систему')
		}
		localStorage.setItem('token', response.data.access)
		cookies.set('token', response.data.refresh, {sameSite: 'none', secure: true})
		return response.data
  	}
)

export const fetchUserInfo = createAsyncThunk<IUser,void,{ rejectValue: string }>(
	'auth/fetchUserInfo',
	async (_, {rejectWithValue}) => {
		const response = await UserService.getUser()
		if (!response) {
			return rejectWithValue('Произошла ошибка при подгрузке данных профиля')
		}
		return response.data
	}
)

export const patchUserInfo = createAsyncThunk<IUser, IPatchInfo,{ rejectValue: string }>(
	'auth/patchUserInfo',
	async function (value: IPatchInfo, {rejectWithValue}) {
		const response = await UserService.updateUser(value)
		if (!response) {
			return rejectWithValue('Произошла ошибка при обновлении данных')
		}
		return response.data
	}
)

const initialState: UserState = {
	user: {
		  id: 0,
		  username: "username",
		  email: "user@example.com",
		  is_active: true,
		  staff: true
		},
	isAuth: false,
	isLoading: false,
    status: null
};
  
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
  },
  extraReducers: (builder) => {
    builder
		.addCase(refreshToken.fulfilled, (state) => {
			state.status = 'finished';
			state.isLoading = false;
			state.isAuth = true;
		})
		.addCase(refreshToken.rejected, (state) => {
			state.status = 'error';
			state.isLoading = false;
			state.isAuth = false;
		})
		.addCase(refreshToken.pending, (state) => {
			state.status = 'loading';
			state.isLoading = true;
		})
		.addCase(registration.fulfilled, (state, action) => {
			state.status = 'finished';
			state.isLoading = false;
			state.isAuth = true;
			setUser(action.payload);	
		})
		.addCase(registration.rejected, (state) => {
			state.status = 'error';
			state.isLoading = false;
			state.isAuth = false;
		})
		.addCase(registration.pending, (state) => {
			state.status = 'loading';
			state.isLoading = true;
		})
		.addCase(login.fulfilled, (state) => {
			state.status = 'finished';
			state.isLoading = false;
			state.isAuth = true;
		})
		.addCase(login.rejected, (state) => {
			state.status = 'error';
			state.isLoading = false;
			state.isAuth = false;
		})
		.addCase(login.pending, (state) => {
			state.status = 'loading';
			state.isLoading = true;
		})
		.addCase(fetchUserInfo.fulfilled, (state, action) => {
			state.status = 'finished';
			state.isLoading = false;
			if (cookies.get('token')) {
				state.isAuth = true;
				setUser(action.payload);
			}
		})
		.addCase(fetchUserInfo.rejected, (state) => {
			state.status = 'error';
			state.isLoading = false;
			state.isAuth = false;
		})
		.addCase(fetchUserInfo.pending, (state) => {
			state.status = 'loading';
			state.isLoading = true;
		})
		.addCase(patchUserInfo.fulfilled, (state, action) => {
			state.status = 'finished';
			state.isLoading = false;
			state.isAuth = true;
			setUser(action.payload);
		})
		.addCase(patchUserInfo.rejected, (state) => {
			state.status = 'error';
			state.isLoading = false;
		})
		.addCase(patchUserInfo.pending, (state) => {
			state.status = 'loading';
			state.isLoading = true;
		})
  },
});	

export const { setUser, setIsAuth, setIsLoading } = authSlice.actions;

export default authSlice.reducer;
