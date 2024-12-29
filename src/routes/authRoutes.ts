/**
 * author Saquib Shaikh
 * created on 26-12-2024-00h-28m
 * github: https://github.com/saquibshaikh14
 * copyright 2024
*/

import { Router } from "express";
import authController from '../controllers/authController';
import { asyncHandler, ensureAuthenticated } from "@/utils";
import { validateLogin, validateRegistration, validateTOTP } from "@/utils/validation";

const router = Router();

router.post('/register', validateRegistration, asyncHandler(authController.register));
router.post('/login', validateLogin, asyncHandler(authController.login));
router.post('/login-status', ensureAuthenticated, asyncHandler(authController.isAuthenticated));
router.post('/handle2FA', validateTOTP, ensureAuthenticated, asyncHandler(authController.handle2FA));
router.post('/logout', asyncHandler(authController.logout));
router.get('/logout', asyncHandler(authController.logout));

export default router;