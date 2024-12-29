/**
 * author Saquib Shaikh
 * created on 25-12-2024-01h-33m
 * github: https://github.com/saquibshaikh14
 * copyright 2024
*/

/* eslint-disable @typescript-eslint/no-explicit-any */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";



class ApiClient {
    private axiosInstance: AxiosInstance;

    constructor(baseURL: string, config: AxiosRequestConfig = {}) {
        this.axiosInstance = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
            ...config,
            timeout: 10000,
        });
        this.axiosInstance.interceptors.response.use(
            (response: AxiosResponse): AxiosResponse<any> => {
                //handling success scenario
                const { data } = response;
                response.data = {
                    status: 'success',
                    code: response.status,
                    message: data.message || 'Operation completed successfully',
                    data: data.data || null,
                    error: null,
                    requestId: data.requestId || '',
                    meta: data.meta || {},
                };
                return response;
            },
            (error): Promise<TwoFAClient.ApiResponse<any>> => {

                //handling failure scenario based on response
                if (error.response) {
                    const { data } = error.response;
                    const errorResponse = {
                        status: 'error',
                        code: error.response.status,
                        message: data.message || 'An error occurred',
                        error: data.error || ['Unknown error'],
                        requestId: data.requestId || '',
                        meta: data.meta || {},
                    }
                    return Promise.reject(errorResponse);
                }

                // Handle cases where no response is received (network error or timeout)
                return Promise.reject({
                    status: 'error',
                    code: 500,
                    message: 'Network error or no response from server.',
                    error: { type: 'NetworkError', details: [error.message] },
                    requestId: '',
                    meta: {},
                });
            }
        );

    }

    // GET request method with proper type
    async get<T>(endpoint: string, config: AxiosRequestConfig = {}): Promise<TwoFAClient.ApiResponse<T>> {
        try {
            const response = await this.axiosInstance.get<TwoFAClient.ApiResponse<T>>(endpoint, config);
            return response.data;
        } catch (error) {
            return error as TwoFAClient.ApiResponse<T>;
        }
    }

    // POST request method with proper type
    async post<T>(endpoint: string, body: any, config: AxiosRequestConfig = {}): Promise<TwoFAClient.ApiResponse<T>> {
        try {
            const response = await this.axiosInstance.post<TwoFAClient.ApiResponse<T>>(endpoint, body, config);
            return response.data;
        } catch (error) {
            return error as TwoFAClient.ApiResponse<T>;
        }
    }
}

export default ApiClient;