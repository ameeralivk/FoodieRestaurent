import express from "express";
import { UserAuthRepository } from "../../Repositories/user/auth/implimentation/userRepository";
import { UserAuthService } from "../../services/user/auth/implimentation/userAuthService";
import { UserAuthController } from "../../Controller/user/auth/implimentation/userAuthController";
const router = express.Router()

const userAuthRepository = new UserAuthRepository()
const userAuthService = new UserAuthService(userAuthRepository)
const userController = new UserAuthController(userAuthService)



router.route('/login').post(userController.register)



export default router