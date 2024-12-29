/**
 * author Saquib Shaikh
 * created on 26-12-2024-00h-28m
 * github: https://github.com/saquibshaikh14
 * copyright 2024
*/

import { Router } from "express";
import authRouter from './authRoutes';
import userRouter from './userRoutes';


const router = Router();
router.use('/auth', authRouter);
router.use('/user', userRouter);


export default router;