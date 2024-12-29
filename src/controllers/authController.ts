/**
 * author Saquib Shaikh
 * created on 26-12-2024-01h-53m
 * github: https://github.com/saquibshaikh14
 * copyright 2024
*/
import { deleteFields, User, userDb } from "@/db";
import { Secure } from "@/utils";
import { NextFunction, Request, Response } from "express";
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
import { TwoFA } from "types";

const authController = {
    register: async (req: Request, res: Response, next: NextFunction) => {
        const { email, password, firstname, lastname } = req.body;
        //use reliable hashing algorithm or module
        const hashedPassword = Secure.hash(password);
        //save to db
        const user: User = {
            email,
            firstName: firstname,
            lastName: lastname,
            passwordHash: hashedPassword
        }
        const dbResponse = await userDb.insertOne(user);
        if (!dbResponse) {
            let response: TwoFA.ErrorResponse = {
                status: 'error',
                code: 409,
                message: 'User already exists',
                error: {
                    type: 'ValidationError',
                    details: ['Email already in use'],
                },
            };
            return res.status(409).json(response);
        }
        // twoFAStatus = "required";
        //setup session
        req.session.userId = user.email;
        req.session.twoFAStatus = "required";

        //add 2fa status.
        dbResponse.twoFAStatus = "required";
        //response
        let response: TwoFA.SuccessResponse<{ user: User }> = {
            "status": "success",
            "code": 200,
            "message": "User created.",
            "data": {
                user: dbResponse
            },
            "requestId": req.requestId,
            "meta": {}
        }
        return res.status(200).json(response);
    },
    //use passport or any better alternative to authenticaate
    login: async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const user: User | undefined = userDb.findOne({ email });
        if (!user) {
            let response: TwoFA.ErrorResponse = {
                status: 'error',
                code: 401,
                message: 'Invalid credentials.',
                error: {
                    type: 'AuthenticationError',
                    details: ['Incorrect username or password.']
                },
            };
            return res.status(401).json(response);
        }
        if (Secure.verify(password, user.passwordHash!)) { //verify password
            //user email exists and password is correct
            //if using passport, everything will be handled by it
            //else we can do something like this:
            //create a session for the user
            req.session.userId = user.email;
            req.session.twoFAStatus = "required";

            let response: TwoFA.SuccessResponse<{ user: User }> = {
                "status": "success",
                "code": 200,
                "message": "Logged In.",
                "data": {
                    user: {
                        ...deleteFields(['passwordHash', 'twoFactorSecret', 'createdAt', 'updatedAt'], user),
                        twoFAStatus: "required"
                    }
                },
                "requestId": req.requestId,
                "meta": {}
            };
            return res.json(response);
        }
        let response: TwoFA.ErrorResponse = {
            status: 'error',
            code: 401,
            message: 'Invalid credentials.',
            error: {
                type: 'AuthenticationError',
                details: ['Incorrect username or password.']
            },
        };
        return res.status(401).json(response);
    },

    logout: async (req: Request, res: Response) => {
        delete req.session.userId;
        delete req.session.twoFAStatus;
        let response: TwoFA.SuccessResponse<null> = {
            status: 'success',
            code: 201,
            data: null,
            message: 'User logged out successfully!',
            meta: {},
        }
        return res.status(response.code).json(response);
    },

    isAuthenticated: async (req: Request, res: Response) => {
        let response: TwoFA.SuccessResponse<{ user: Partial<User> & Record<"twoFAStatus", string> }> = {
            "status": "success",
            "code": 200,
            "message": "Logged In.",
            "data": {
                user: {
                    ...req.user,
                    twoFAStatus: req.session.twoFAStatus!,
                }
            },
            "requestId": req.requestId,
            "meta": {}
        };
        return res.status(200).json(response);
    },
    handle2FA: async (req: Request, res: Response) => {
        const { action, totp } = req.body;
        //if user already enrolled in 2fa, blocking access to skip and enable
        if (["skip", "enable"].includes(action) && req.user.twoFactorEnabled) {
            let response: TwoFA.ErrorResponse = {
                status: 'error',
                code: 405,
                message: "Invalid Request",
                error: {
                    type: 'ValidationError',
                    details: ["Invalid request " + action],
                }
            }

            return res.status(response.code).json(response);
        }

        if (action === "skip") {
            req.session.twoFAStatus = "skip";
            let response: TwoFA.SuccessResponse<{ twoFAStatus: string }> = {
                "status": "success",
                "code": 200,
                "message": "Two factor setup skipped",
                "data": {
                    twoFAStatus: "skip",
                },
                "requestId": req.requestId,
                "meta": {}
            }
            return res.status(200).json(response);
        }
        if (action === "enable") {

            const secret = speakeasy.generateSecret({
                issuer: "Node 2FA Implementation",
                name: `Node 2FA:${req.session.userId}`,
                symbols: true
            });

            //Temporary save the secret till first otp is validated during setup
            req.session.twoFASecret = secret.base32;
            const qr = await qrcode.toDataURL(secret.otpauth_url!);
            let response: TwoFA.SuccessResponse<{ twoFAStatus: string, qrCodeUrl: string }> = {
                "status": "success",
                "code": 200,
                "message": "Two factor setup requested",
                "data": {
                    twoFAStatus: "setup",
                    qrCodeUrl: qr,
                },
                "requestId": req.requestId,
                "meta": {}
            }
            return res.status(response.code).json(response);
        }
        if (action === "verify") {

            const email = req.session.userId; //get loggedin user email/id
            const user = userDb.findOne({ email }); //fetch user from db to get user secret
            if (!user) {
                req.logger.info("Srange! No user found with this email: " + email);
                let response: TwoFA.ErrorResponse = {
                    status: 'error',
                    code: 500,
                    message: "Internal Server Error",
                    error: {
                        type: 'InternalError',
                        details: ["Something went wrong"],
                    }
                };
                return res.status(response.code).json(response);
            }
            let secret = req.session.twoFASecret;

            if (user.twoFactorEnabled) { //get secret for loggedIn user from DB
                secret = user.twoFactorSecret
            }
            const isValid = speakeasy.totp.verify({
                secret: secret!,
                encoding: 'base32',
                token: totp,
            });
            if (!isValid) {
                let response: TwoFA.ErrorResponse = {
                    status: 'error',
                    code: 401,
                    message: "Invalid TOTP",
                    error: {
                        type: 'AuthenticationError',
                        details: ["Invalid TOTP"]
                    }
                }

                return res.status(response.code).json(response);
            }

            if (user.twoFactorEnabled) {
                //user has enabled 2fa and requesting totp validation
                req.session.twoFAStatus = 'complete';
            } else {
                //2fa setup verification
                //save secret to user data
                const updatedUser = userDb.updateOne({ email: req.session.userId }, {
                    twoFactorSecret: req.session.twoFASecret!,
                    twoFactorEnabled: true,
                }, ['passwordHash', 'twoFactorSecret', 'createdAt', 'updatedAt']);

                if (!updatedUser) {
                    //no user with this email
                    req.logger.info("Srange! No user found with this email");
                    let response: TwoFA.ErrorResponse = {
                        status: 'error',
                        code: 500,
                        message: "Internal Server Error",
                        error: {
                            type: 'InternalError',
                            details: ["Something went wrong"],
                        }
                    };
                    return res.status(response.code).json(response);
                }
                req.user = updatedUser!;
                req.session.twoFAStatus = 'complete';
                delete req.session.twoFASecret;
            }

            let response: TwoFA.SuccessResponse<{ user: User }> = {
                "status": "success",
                "code": 200,
                "message": "TOTP verified.",
                "data": {
                    user: {
                        ...deleteFields(['passwordHash', 'twoFactorSecret', 'createdAt', 'updatedAt'], user),
                        twoFAStatus: "complete"
                    }
                },
                "requestId": req.requestId,
                "meta": {}
            }
            return res.status(response.code).json(response);
        }
    }
}

export default authController;