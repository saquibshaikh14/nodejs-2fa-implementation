/**
 * author Saquib Shaikh
 * created on 29-12-2024-19h-37m
 * github: https://github.com/saquibshaikh14
 * copyright 2024
*/

import { Request, Response } from "express";
import { TwoFA } from "types";
import { User, userDb } from "@/db";

export const userController = {
    getUser: async (req: Request, res: Response) => {
        const user = userDb.findOne({ email: req.session.userId }, ['passwordHash', 'twoFactorSecret',]);
        let response: TwoFA.SuccessResponse<{ user: User }> | TwoFA.ErrorResponse;
        if (!user) {
            response = {
                status: 'error',
                code: 404,
                message: "User not found!",
                error: {
                    type: "NotFoundError",
                    details: ["user not found"],
                },
                meta: {},
                requestId: req.requestId,
            }
            return res.status(response.code).json(response);
        }
        response = {
            status: "success",
            code: 200,
            message: "User found",
            data: {
                user: user
            },
            meta: {},
            requestId: req.requestId
        }
        return res.status(response.code).json(response);
    },
    updateUser: async (req: Request, res: Response) => {
        const { firstname, lastname } = req.body;
        const email = req.session.userId;
        let response: TwoFA.SuccessResponse<{ user: User }> | TwoFA.ErrorResponse;
        const updatedUser = userDb.updateOne({ email }, {
            firstName: firstname,
            lastName: lastname
        }, ['passwordHash', 'twoFactorSecret']);

        if (!updatedUser) {
            req.logger.info("Srange! No user found with this email: " + email);
            response = {
                status: 'error',
                code: 500,
                message: "Internal Server Error",
                error: {
                    type: 'InternalError',
                    details: ["Something went wrong"],
                },
                meta: {}
            };
            return res.status(response.code).json(response);
        }
        response = {
            status: 'success',
            code: 200,
            message: "User updated",
            data: {
                user: updatedUser,
            },
            meta: {},
            requestId: req.requestId,
        }
        return res.status(response.code).json(response);
    }
}