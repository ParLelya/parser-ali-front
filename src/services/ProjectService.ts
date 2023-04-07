import $api from "../http";
import { AxiosResponse } from "axios";
import { IProject } from "../types/interface";

export default class ProjectService {
	static getProjects(): Promise<AxiosResponse<IProject>> {
		return $api.get<IProject>('/api/projects/')
	}

	static createProject(title: string, id: number): Promise<AxiosResponse<IProject>> {
		return $api.post('/api/projects/', {title: title, user: id})
	}
}