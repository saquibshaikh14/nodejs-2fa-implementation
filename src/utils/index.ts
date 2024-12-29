/**
 * author Saquib Shaikh
 * created on 26-12-2024-02h-01m
 * github: https://github.com/saquibshaikh14
 * copyright 2024
*/

import { NextFunction, Request, RequestHandler, Response } from "express";
import crypto from 'crypto';
import { TwoFA } from "types";
import { User } from "@/db";

export const asyncHandler = (fun: (req: Request, res: Response, next: NextFunction) => void) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fun(req, res, next)).catch(next);
};

export const Secure = {
    hash: (password: string) => {
        return crypto.createHash("sha256").update(password).digest("hex");
    },
    verify: (password: string, hashedPassword: string) => {
        const newHashedPassword = crypto.createHash("sha256").update(password).digest("hex");
        return newHashedPassword === hashedPassword;
    },
}


export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.userId) {
        const response: TwoFA.ErrorResponse = {
            status: 'error',
            code: 401,
            message: 'Session expired or not logged in. Please log in to continue',
            error: {
                type: 'AuthenticationError',
                details: ['You are not authorized to access this resource'],
            },
            requestId: req.requestId,
            meta: {
                redirect: "login",
            },
        };
        res.status(response.code).json(response);
        return;
    }
    if (req.session.twoFAStatus === "required") {
        if (!req.originalUrl.endsWith('/handle2fa')) {
            console.log(req.user);
            let response: TwoFA.SuccessResponse<{ user: Partial<User> & Record<"twoFAStatus", string> }> = {
                "status": "success",
                "code": 200,
                "message": "Two Factor Authentication Required",
                "data": {
                    user: {
                        ...req.user,
                        twoFAStatus: "required"
                    }
                },
                "requestId": req.requestId,
                "meta": {
                    "action": "2fa"
                }
            };
            res.status(response.code).json(response);
            return;
        }
    }

    // Call next() without returning anything
    next();
};
