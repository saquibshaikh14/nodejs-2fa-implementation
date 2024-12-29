/**
 * author Saquib Shaikh
 * created on 10-11-2024-12h-41m
 * github: https://github.com/saquibshaikh14
 * copyright 2024
*/

import { NextFunction, Request, Response } from "express";

export default function loggerMiddleware (req: Request, _res: Response, next: NextFunction): void {
    const {logger, config} = req;
    config["log.request"] && logger.info(`${req.method.toUpperCase()} ${req.url}`);
    next();
}