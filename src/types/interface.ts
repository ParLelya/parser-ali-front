export interface IProduct {
		id: number;
		name: string;
		images: string;
}

export type parameters = {
	title: string;
	info: {
		name: string
		id?: string | number 
	};
}

export interface IProductItem extends IProduct {
	unique_id: string;
	from_whom: string;
	prices: string;
	parameters: string | parameters | parameters[];
	additional_parameters: string;
}

export interface IProject {
	id: number;
	title: string;
	user?: number;
}

export interface IProjectItem extends IProject {
	products: {
		  id: number;
		  title: string;
		  parameters: string | parameters | parameters[];
		  count: number;
		  price?: number,
		  from_whom: string;
		}[];
}