import { Router } from "express";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import userSchema from "../schemas/userSchema.js";
import * as controller from "../controllers/userController.js"

const userRouter = Router();

userRouter.post('/users/sign-up', validateSchemaMiddleware(userSchema), controller.register)
userRouter.post('/users/sign-in', validateSchemaMiddleware(userSchema), controller.login)

export default userRouter;  