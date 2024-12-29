/**
 * author Saquib Shaikh
 * created on 09-11-2024-02h-37m
 * github: https://github.com/saquibshaikh14
 * copyright 2024
*/

import express, { Express, NextFunction, Request, Response } from 'express';
import session from "express-session";
import cors from "cors";

import config from "@/config/server.config";
import logger from '@/logger';
import { randomUUID } from 'crypto';
import loggerMiddleware from './loggerMiddleware';
import { userDb } from '@/db';

export default function configureApp(app: Express): void {
    app.use(cors({
        origin: ['http://localhost:3001'],
        credentials: true,
    })); //change to client url for production

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(session({
        secret: 'sessoin secret', //use node_env variable in prod
        name: 'my-2fa-app-session',
        proxy: true,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false, /*true if using HTTPS */
            httpOnly: true,
            maxAge: 15 * 60 * 1000, //session expires after 15 minutes of inactivity
        }
    }));

    //serialize user
    app.use((req: Request, _res: Response, next: NextFunction) => {
        if (req.session.userId) {
            let user = userDb.findOne({ email: req.session.userId }, ['passwordHash', 'createdAt', 'twoFactorSecret','updatedAt']);//get user from db
            req.user = user;
        }
        next();
    });

    app.use(loadContext);
    app.use(loggerMiddleware);
}

function loadContext(req: Request, _res: Response, next: NextFunction) {
    req.config = config;
    let uuid = randomUUID();
    req.logger = logger.child({ requestId: uuid });
    req.requestId = uuid;
    next();
}
