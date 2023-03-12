export interface IProduct {
		id: number
		name: string
		images: string
}

export interface IProductItem extends IProduct {
	unique_id: string
	parameters: string
	additional_parameters: string
}