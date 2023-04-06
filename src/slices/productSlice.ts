import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IProjectItem, parameters } from '../types/interface'

export interface ProductState {
  totalPrice: number
  totalProductsCount: number
  products: {
	id: number;
	title: string;
	parameters: string | parameters | parameters[];
	count: number;
	from_whom: string;
  }[]
}

const initialState: ProductState = {
	totalPrice: 0,
	totalProductsCount: 0,
	products: [{
		  id: 0,
		  title: "",
		  parameters: "",
		  count: 0,
		  from_whom: ""
		}]
	}

export const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<any>) {
		const findProduct = state.products.find(obj => obj.id === action.payload.id)

		if (findProduct) {
			findProduct.count++
		} else {
			state.products.push({
				...action.payload, count: 1
			})
		}

		// state.totalPrice = state.products.reduce((sum, obj) => {
		// 	return obj.price * obj.count + sum
		// }, 0)

		state.totalProductsCount = state.products.reduce((sum, item) => {
			return sum + item.count
		}, 0)
    },
	removeProduct(state, action: PayloadAction<number>) {
		state.products = state.products.filter(obj => obj.id !== action.payload)

		// state.totalPrice = state.products.reduce((sum, obj) => {
		// 	return obj.price * obj.count + sum
		// }, 0)

		state.totalProductsCount = state.products.reduce((sum, item) => {
			return sum + item.count
		}, 0)
    },
	plusCount(state, action: PayloadAction<number>) {
		const findProduct = state.products.find(obj => obj.id === action.payload)

		if (findProduct) {
			findProduct.count++
		}

		state.totalProductsCount = state.products.reduce((sum, item) => {
			return sum + item.count
		}, 0)
	},
	minusCount(state, action: PayloadAction<number>) {
		const findProduct = state.products.find(obj => obj.id === action.payload)

		if (findProduct) {
			findProduct.count--
		}
		state.totalProductsCount = state.products.reduce((sum, item) => {
			return sum + item.count
		}, 0)
	},
  },
})

export const { addProduct, removeProduct, plusCount, minusCount } = ProductSlice.actions

export default ProductSlice.reducer