import type { App } from 'vue';
import { createEmitter } from '../emulators/create-emitter';
import axios from 'axios';

export default {
    install: (app: App) => {
        const axiosInstance = axios.create({
            baseURL: '/',
        });

        axiosInstance.interceptors.request.use((config) => config, (error) => Promise.reject(error));
        axiosInstance.interceptors.response.use((response) => response, (error) => Promise.reject(error));

        app.provide('axios', axiosInstance);
        app.provide('emitter', createEmitter());
    }
};
