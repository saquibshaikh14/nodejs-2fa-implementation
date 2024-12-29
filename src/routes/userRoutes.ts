/**
 * author Saquib Shaikh
 * created on 29-12-2024-17h-36m
 * github: https://github.com/saquibshaikh14
 * copyright 2024
*/


import { userController } from "@/controllers/userController";
import { asyncHandler, ensureAuthenticated } from "@/utils";
import { validateUpdateUser } from "@/utils/validation";
import { Request, Response, Router } from "express";


const router = Router();

router.get('/user', ensureAuthenticated, asyncHandler(userController.getUser));
router.post('/update-user', ensureAuthenticated, validateUpdateUser, asyncHandler(userController.updateUser));

export default router;