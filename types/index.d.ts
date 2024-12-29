import { User } from '@/db';
import { ErrorResponse } from './../client/src/api/ApiClient';
/**
 * author Saquib Shaikh
 * created on 09-11-2024-21h-47m
 * github: https://github.com/saquibshaikh14
 * copyright 2024
 */

import { Request } from "express";
import { Logger } from "pino";

declare global {
	namespace Express {
		interface Request {
			logger: Logger;
			config: Record<string, boolean | string>;
			requestId: string;
			user: User;
		}
	}
}

declare module "express-session" {
	interface SessionData {
		userId: User.email; // Add the user property to the session
		twoFAStatus: "required" | "skip" | "complete" | "setup";
		twoFASecret: string;
	}
}

declare namespace TwoFA {
	//change in client/src/api/ApiClient.ts
	type ErrorType = "ValidationError" | "AuthenticationError" | "AuthorizationError" | "InternalError" | "UnknownError" | "NotFoundError";
	interface ErrorResponse {
		status: 'error';
		code: number;
		message: string;
		error: {
			type: ErrorType; //Type of error (e.g. validation, internal, etc.)
			details?: string | string[]; //Error details
		} | null;
		requestId?: string;
		meta?: Record<string, any>;
	}
	interface SuccessResponse<T> {
		status: 'success';
		code: number;
		message: string;
		data: T;
		requestId?: string;
		meta?: Record<string, any>;
	}

}