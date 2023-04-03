export interface IProduct {
		id: number
		name: string
		images: string
}

export interface IProductItem extends IProduct {
	unique_id: string
	from_whom: string
	prices: string
	parameters: string
	additional_parameters: string
}

export interface IProject {
	id: number
	title: string
	user?: number
}

export interface IProjectItem extends IProject {
	products: [
		{
		  title: string
		  parameters: string
		  count: number
		  from_whom: string
		}
	  ]
}