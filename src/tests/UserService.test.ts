import axios from 'axios';
import UserService from '../services/UserService';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getUser', () => {
	const user = [{
			id: 0,
			username: "string",
			email: "user@example.com",
			is_active: true,
			staff: true
		}];
	
		test('should fetch users', async () => {
			const resp = {data: user};
			mockedAxios.get.mockResolvedValue(resp);
			const data = await UserService.getUser()
			expect(mockedAxios.get).toBeCalledTimes(1)
			expect(data).toEqual(user)
		})
});