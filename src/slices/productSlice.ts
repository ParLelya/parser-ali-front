import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IProjectItem, parameters } from '../types/interface'
import ProductService from '../services/ProductService'

export interface ProductState {
	projectTitle: string;
	products: {
		id: number;
		title: string;
		parameters: string | parameters | parameters[];
		count: number;
		from_whom: string;
		// price: number;
	}[];
	totalPrice: number;
	isLoading: boolean;
	status: 'loading' | 'finished' | 'error' | null;
}

const initialState: ProductState = {
	projectTitle: '',
	products: [{
		  id: 0,
		  title: "",
		  parameters: "",
		  count: 0,
		  from_whom: "",
		//   price: 0,
		}],
	totalPrice: 0,
	isLoading: false,
	status: null,
}

export const getProducts = createAsyncThunk<IProjectItem, number,{ rejectValue: string }>(
	'products/getProducts',
	async function (id, {rejectWithValue}) {
		const response = await ProductService.getProducts(id)
		if (!response) {
			return rejectWithValue('Произошла ошибка при попытке изменить количество продукта')
		}
		return response.data
	}
)

export const updateProductCount = createAsyncThunk<any, any,{ rejectValue: string }>(
	'products/updateProductCount',
	async function (value, {rejectWithValue}) {
		const {id, count} = value
		const response = await ProductService.updateCount(id, count)
		if (!response) {
			return rejectWithValue('Произошла ошибка при попытке изменить количество продукта')
		}
		return response.data
	}
)

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
	removeProduct(state, action: PayloadAction<number>) {
		state.products = state.products.filter(obj => obj.id !== action.payload)

		// state.totalPrice = state.products.reduce((sum, obj) => {
		// 	return obj.price * obj.count + sum
		// }, 0)
    },
	plusCount(state, action: PayloadAction<number>) {
		const findProduct = state.products.find(obj => obj.id === action.payload)

		if (findProduct) {
			findProduct.count++
		}

		// state.totalPrice = state.products.reduce((sum, obj) => {
		// 	return obj.price * obj.count + sum
		// }, 0)
	},
	minusCount(state, action: PayloadAction<number>) {
		const findProduct = state.products.find(obj => obj.id === action.payload)

		if (findProduct) {
			findProduct.count--
			if (findProduct.count === 0) {
				window.confirm('Хотите удалить продукт?')
				? removeProduct(findProduct.id)
				: findProduct.count = 1
			}
		}

		// state.totalPrice = state.products.reduce((sum, obj) => {
		// 	return obj.price * obj.count + sum
		// }, 0)
	},
  },

  extraReducers: (builder) => {
	builder
		.addCase(updateProductCount.fulfilled, (state) => {
			state.status = 'finished';
			state.isLoading = false;
		})
		.addCase(updateProductCount.rejected, (state) => {
			state.status = 'error';
			state.isLoading = false;
		})
		.addCase(updateProductCount.pending, (state) => {
			state.status = 'loading';
			state.isLoading = true;
		})
		.addCase(getProducts.fulfilled, (state, action: PayloadAction<IProjectItem>) => {
			state.status = 'finished';
			state.isLoading = false;
			state.projectTitle = action.payload.title
			state.products = action.payload.products
		})
		.addCase(getProducts.rejected, (state) => {
			state.status = 'error';
			state.isLoading = false;
		})
		.addCase(getProducts.pending, (state) => {
			state.status = 'loading';
			state.isLoading = true;
		})
  },
})

export const { removeProduct, plusCount, minusCount } = productSlice.actions

export default productSlice.reducer