import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import AuthService from '../services/AuthService';
import UserService from './../services/UserService';
import { ISignUp, IUser, IToken, IAuth } from '../types/auth/User';
import axios, {AxiosResponse} from 'axios';
import { API_URL } from './../http/index';

export interface UserState {
  user: IUser;
  isAuth: boolean;
  isLoading: boolean;
  status: 'loading' | 'finished' | 'error' | null
}

export const login = createAsyncThunk<AxiosResponse<IToken>,IAuth,{ rejectValue: string }>(
	'auth/login',
	async function (value: IAuth, {rejectWithValue, dispatch}) {
		console.log('выполняется вход')
		const response = await AuthService.login(value)
		if (!response) {
			return rejectWithValue('Произошла ошибка при входе в систему')
		}
		console.log(response)
		localStorage.setItem('token', response.data.access)
		dispatch(authSlice.actions.setIsAuth(true))
		return response	
  	}
)

export const registration = createAsyncThunk<AxiosResponse<ISignUp>, ISignUp,{ rejectValue: string }>(
	'auth/registration',
	async function (value: ISignUp, {rejectWithValue, dispatch}) {
		console.log('выполняется регистрация')
		const response = await AuthService.registration(value)
		if (!response) {
			return rejectWithValue('Произошла ошибка при регистрации')
		}
		console.log(response)
		dispatch(authSlice.actions.setUser({
			id: Date.now(),
			username: response.data.username,
			email: response.data.email
		}))
		return response
	}
)

export const fetchUserInfo = createAsyncThunk<AxiosResponse<IUser>,void,{ rejectValue: string }>(
	'auth/fetchUserInfo',
	async (_, {rejectWithValue, dispatch}) => {
		console.log('выполняется открытие профиля')
		const response = await UserService.getUser()
		if (!response) {
			return rejectWithValue('Произошла ошибка при подгрузке данных профиля')
		}
		console.log(response);
		dispatch(authSlice.actions.setUser(response.data))
		return response
	}
)

export const checkAuth = createAsyncThunk<AxiosResponse<string>,string,{ rejectValue: string }>(
	'auth/checkAuth',
	async (refreshToken: string, {rejectWithValue, dispatch}) => {
		console.log('выполняется проверка авторизации')
		dispatch(authSlice.actions.setIsLoading(false))
		const response = await axios.post<string>(`${API_URL}/auth/token/refresh/`, refreshToken)
		console.log(response)
		if (!response) {
			return rejectWithValue('Произошла ошибка при проверке авторизации')
		}
		localStorage.setItem('token', response.data)
		dispatch(authSlice.actions.setIsAuth(true))
		return response
	}
)

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
		.addCase(login.fulfilled, (state) => {
			state.status = 'finished'
			state.isAuth = true;
			state.isLoading = false;
		})
		.addCase(login.pending, (state) => {
			state.status = 'loading'
			state.isLoading = true;
		})
		.addCase(login.rejected, (state) => {
			state.status = 'error'
			state.isAuth = false;
		})
		.addCase(registration.fulfilled, (state, action) => {
			state.status = 'finished'
			state.user = action.payload
			state.isLoading = false;
			state.isAuth = true;
		})
		.addCase(registration.rejected, (state) => {
			state.status = 'error'
			state.isLoading = false;
			state.isAuth = false;
		})
		.addCase(fetchUserInfo.fulfilled, (state, action) => {
			state.status = 'finished'
			state.user = action.payload
			state.isLoading = false;
			state.isAuth = true;
		})
		.addCase(fetchUserInfo.pending, (state) => {
			state.status = 'loading'
			state.isLoading = true;
		})
		.addCase(fetchUserInfo.rejected, (state) => {
			state.status = 'error'
			state.isLoading = false;
		})
		.addCase(checkAuth.fulfilled, (state) => {
			state.status = 'finished'
			state.isLoading = false;
			state.isAuth = true;
		})
		.addCase(checkAuth.pending, (state) => {
			state.status = 'loading'
			state.isLoading = true;
			state.isAuth = false;
		})
		.addCase(checkAuth.rejected, (state) => {
			state.status = 'error'
			state.isLoading = false;
			state.isAuth = false;
		})
  },
});	

export const { setUser, setIsAuth, setIsLoading } = authSlice.actions;

export default authSlice.reducer;
