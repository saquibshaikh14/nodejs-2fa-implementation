/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter'; // Import the mock adapter

export interface SuccessResponse<T> {
  status: 'success';
  code: number;
  message: string;
  data: T; // Response data from API
  error: null;
  requestId: string;
  meta: Record<string, any>;
}

export interface ErrorResponse {
  status: 'error';
  code: number;
  message: string;
  error: {
    type: string; // Type of error (e.g. validation, internal, etc.)
    details: string | Record<string, any>; // Error details
  } | null;
  requestId: string;
  meta: Record<string, any>;
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

class MockApiClient {
  private axiosInstance: AxiosInstance;
  private mock: AxiosMockAdapter;

  constructor(baseURL: string, config: AxiosRequestConfig = {}) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        'withCredentials': true,
      },
      ...config,
      timeout: 10000,
    });

    // Initialize the mock adapter
    this.mock = new AxiosMockAdapter(this.axiosInstance);

    // Define the mock responses
    this.setupMocks();
  }

  private setupMocks() {
    // Mock GET request for fetching user data
    this.mock.onGet('/user/12345').reply(200, {
      status: 'success',
      code: 200,
      message: 'Data retrieved successfully.',
      data: {
        userId: '12345',
        name: 'John Doe',
        email: 'johndoe@example.com',
      },
      error: null,
      requestId: 'abcd1234',
      meta: {},
    });

    // Mock POST request for login
    // this.mock.onPost('/login').reply(200, {
    //   status: 'success',
    //   code: 200,
    //   message: 'Login successful.',
    //   data: {
    //     user: {
    //       firstName: 'John',
    //       lastName: 'Doe',
    //       email: 'johndoe@example.com',
    //       is2FAEnabled: true,
    //       twoFAStatus: 'required',
    //     }
    //   },
    //   error: null,
    //   requestId: 'abcd1234',
    //   meta: {},
    // });

    this.mock.onPost('/login').reply(200, {
      status: 'success',
      code: 200,
      message: 'Login successful.',
      data: {
        user: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'johndoe@example.com',
          is2FAEnabled: false,
          twoFAStatus: 'required',
        }
      },
      error: null,
      requestId: 'abcd1234',
      meta: {},
    });

    // Add more mocked endpoints as needed
    // Example: Mock a failed login response
    // this.mock.onPost('/login').reply(400, {
    //   status: 'error',
    //   code: 400,
    //   message: 'Invalid credentials.',
    //   error: { type: 'ValidationError', details: 'Incorrect email or password' },
    //   requestId: 'efgh5678',
    //   meta: {},
    // });
  }

  // GET request method with proper type
  async get<T>(endpoint: string, config: AxiosRequestConfig = {}): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.get<ApiResponse<T>>(endpoint, config);
      return response.data;
    } catch (error) {
      return error as ApiResponse<T>;
    }
  }

  // POST request method with proper type
  async post<T>(endpoint: string, body: any, config: AxiosRequestConfig = {}): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.post<ApiResponse<T>>(endpoint, body, config);
      return response.data;
    } catch (error) {
      return error as ApiResponse<T>;
    }
  }
}

export default MockApiClient;