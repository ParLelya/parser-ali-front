import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IProject } from '../types/interface'
import ProjectService from '../services/ProjectService';

export interface ProjectState {
	projects: IProject[];
	isLoading: boolean;
	status: 'loading' | 'finished' | 'error' | null;
}

const initialState: ProjectState = {
	projects: [],
	isLoading: false,
	status: null,
}

export const getProjects = createAsyncThunk<IProject, void, { rejectValue: string }>(
	'projects/getProjects',
	async function (_, {rejectWithValue}) {
		const response = await ProjectService.getProjects()
		if (!response) {
			return rejectWithValue('Произошла ошибка при получении списка проектов')
		}
		return response.data
	}
)

export const createProject = createAsyncThunk<IProject, any, { rejectValue: string }>(
	'projects/createProject',
	async function (value, {rejectWithValue}) {
		const {title, user} = value
		const response = await ProjectService.createProject(title, user)
		if (!response) {
			return rejectWithValue('Произошла ошибка при создании проекта')
		}
		return response.data
	}
)

export const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
	
  },
  extraReducers: (builder) => {
	builder
		.addCase(getProjects.fulfilled, (state, action: PayloadAction<any>) => {
			state.status = 'finished';
			state.isLoading = false;
			state.projects = action.payload
		}) 
		.addCase(getProjects.rejected, (state) => {
			state.status = 'error';
			state.isLoading = false;
		})
		.addCase(getProjects.pending, (state) => {
			state.status = 'loading';
			state.isLoading = true;
		})
		.addCase(createProject.fulfilled, (state, action: PayloadAction<IProject>) => {
			state.status = 'finished';
			state.isLoading = false;
			state.projects = [...state.projects, action.payload]
		})
		.addCase(createProject.rejected, (state) => {
			state.status = 'error';
			state.isLoading = false;
		})
		.addCase(createProject.pending, (state) => {
			state.status = 'loading';
			state.isLoading = true;
		})
  },

})


export default projectSlice.reducer