import $api from "../http";
import { AxiosResponse } from "axios";
import { IProjectItem } from "../types/interface";


export default class ProductService {
	static getProducts(id: number): Promise<AxiosResponse<IProjectItem>> {
		return $api.get<IProjectItem>(`/api/projects/${id}/`)
	}

	static updateCount(id: number, count: number): Promise<AxiosResponse<any>> {
		return $api.patch<number>(`/api/product_project/${id}/`, {id: id, count: count})
	}
}