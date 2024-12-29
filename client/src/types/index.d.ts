/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * author Saquib Shaikh
 * created on 27-12-2024-21h-53m
 * github: https://github.com/saquibshaikh14
 * copyright 2024
*/

declare namespace TwoFAClient {

    type AuthResponse = AuthSuccess | AuthFailure;
    type TwoFaAction = "skip" | "enable" | "verify";

    interface SuccessResponse<T> {
        status: 'success';
        code: number;
        message: string;
        data: T; //Response data from api
        error: null;
        requestId: string;
        meta: Record<string, any>;
    }

    //change in types/index.d.ts
    type ErrorType = "ValidationError" | "AuthenticationError" | "AuthorizationError" | "InternalError" | "UnknownError" | "NetworkError" | "NotFoundError";
    interface ErrorResponse {
        status: 'error';
        code: number;
        message: string;
        error: {
            type: ErrorType; //Type of error (e.g. validation, internal, etc.)
            details: string[]; //Error details
        } | null;
        requestId: string;
        meta: Record<string, any>;
    }

    type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

    interface AuthSuccess {
        status: "success";
        message: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data?: Record<string, any>;
    }
    interface AuthFailure {
        status: "error";
        message: string;
        error: {
            type: ErrorType;
            details: string[];
        };
    }
}