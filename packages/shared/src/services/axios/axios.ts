import axios from 'axios';
import type { App } from 'vue';
import { provide } from 'vue';

interface AxiosOptions {
  baseUrl?: string,
  token?: string,
}

export default {
  install: (app: App, options: AxiosOptions) => {
    const $axios = axios.create({
      baseURL: options.baseUrl,
      headers: {
        Authorization: options.token ? `${options.token}` : '',
      },
    });

    $axios.interceptors.request.use((config) => config, (error) => Promise.reject(error));
    $axios.interceptors.response.use((response) => response, (error) => Promise.reject(error));

    provide('axios', $axios);
  },
};
