import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { storageService } from './storage.service';

// const refreshToken = (axios: AxiosInstance, config: AxiosRequestConfig) => {
//   return new Promise((resolve, reject) => {
//     authService.refreshToken(storageService.getRefreshToken()).then((res) => { // Endpoint to request new token
//       storageService.setAccessToken(res.data.access_token); // Store new token locally (Local storage or cookies)
//       config.headers.authorization = `Bearer ${res.data.access_token}`; // Attach the new token to the headers

//       axios.request(config).then((result) => { // Repeat the initial request
//         return resolve(result);
//       }).catch((err) => {
//         console.log(err);
//         return reject(err);
//       })
//     })
//   })
// };


class Request {
  client;

  constructor() {
    this.client = axios.create({
        baseURL: `${process.env.REACT_APP_API_URL}`,
    });
    this.client.interceptors.request.use(this.onPreRequest, this.onRequestFailure);
    this.client.interceptors.response.use(this.onRequestSuccess, this.onRequestFailure);
  }

  async onPreRequest(config: any) {
    const token = await storageService.getAccessToken();

    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }

    return config;
  }

  onRequestSuccess(response: AxiosResponse) {
    return response;
  }

  onRequestFailure(error: any) {
    // if (
    //   error.config &&
    //   [401, 403].includes(error.response?.status) && // Use the status code your server returns when token has expired
    //   !error.config.__isRetry
      // !error.response.config.url.includes('/auth/')
    // ) {
    //   if (error.response.config.url.includes('/auth/refresh')) {
        // authLogout()
        // window.location.reload()
    //   } else 
    // {
    //     return new Promise((resolve, reject) => {
    //       refreshToken(axios, error.config).then((result) => {
    //         resolve(result)
    //       }).catch((err) => {
    //         reject(err)
    //       });
    //     });
    //   }
    // }

    return Promise.reject(error);

    // if ([401, 403].includes(response?.status)) {
    //   authLogout()

    //   if (!response.config.url.includes('/auth/')) {
    //     window.location.reload()
    //   }
    // }

    // return Promise.reject(response);
  }
}

const request = new Request();
export const httpClient = request.client;

/**
 * HttpClient for react base on axios
 */
// export default httpClient;
