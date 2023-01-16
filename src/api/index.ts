import { Game } from '../types';

// TODO: Improve error handling. Maybe add more messages based on status code?
function handleResponse(response: Response) {
  if (!response.ok) {
    return Promise.reject(new Error('Ooops...Something went wrong!'));
  }
  return Promise.resolve(response).then((res) => res.json());
}

const Api = {
  getAppById(id: string): Promise<Game[]> {
    return fetch(`${process.env.REACT_APP_API_URL}/api/apps?appid=${id}`).then(handleResponse);
  },
  getAppsByTab(tab: string): Promise<Game[]> {
    return fetch(`${process.env.REACT_APP_API_URL}/api/apps?tab=${tab}`).then(handleResponse);
  },
};
export default Api;
