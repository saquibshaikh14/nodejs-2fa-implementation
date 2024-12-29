/**
 * author Saquib Shaikh
 * created on 26-12-2024-20h-25m
 * github: https://github.com/saquibshaikh14
 * copyright 2024
*/

import { check, validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import { TwoFA } from 'types';

// Middleware for validating registration form
export const validateRegistration = [
    check('email')
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail(),
    check('firstname')
        .notEmpty()
        .withMessage('First name is required')
        .escape(),
    check('lastname')
        .notEmpty()
        .withMessage('Last name is required')
        .escape(),
    check('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .bail()
        .matches(/\d/)
        .withMessage('Password must contain at least one numeric digit')
        .bail()
        .matches(/[A-Z]/)
        .withMessage('Password must contain at least one uppercase letter')
        .bail()
        .matches(/[!@#$%^&*]/)
        .withMessage('Password must contain at least one special character')
        .escape(),
    (req: Request, res: Response, next: NextFunction) => {
        handleValidationErrors(req, res, next);
    },
];

// Middleware for validating login form
export const validateLogin = [
    check('email')
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail(),
    check('password')
        .escape(),
    (req: Request, res: Response, next: NextFunction) => {
        handleValidationErrors(req, res, next);
    },
];

export const validateTOTP = [
    check('action')
        .isIn(['verify', 'skip', 'enable'])
        .withMessage('Invalid Request')
        .escape()
        .bail(),
    check('totp') //validate TOTP only if action is "verify"
        .if((value, { req }) => req.body.action === "verify")
        .isLength({ min: 6, max: 6 })
        .withMessage("TOTP must be exactly 6 digits")
        .bail()
        .isNumeric()
        .withMessage("TOTP must only contain numeric digits")
        .escape(),
    (req: Request, res: Response, next: NextFunction) => {
        handleValidationErrors(req, res, next);
    }
]

export const validateUpdateUser = [
    check('firstname')
        .notEmpty()
        .withMessage('First name is required')
        .escape(),
    check('lastname')
        .notEmpty()
        .withMessage('Last name is required')
        .escape(),
    (req: Request, res: Response, next: NextFunction) => {
        handleValidationErrors(req, res, next);
    }
]

// Helper function to handle validation errors
const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const response: TwoFA.ErrorResponse = {
            status: 'error',
            message: 'Validation error(s)',
            code: 400,
            error: {
                type: 'ValidationError',
                details: errors.array().map((err) => err.msg),
            },
            requestId: req.requestId,
            meta: {},
        };
        return res.status(response.code).json(response);
    }
    next();
};