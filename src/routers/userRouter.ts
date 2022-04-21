import { Router } from "express";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import userSchema from "../schemas/userSchema.js";
import * as controller from "../controllers/userController.js"

const userRouter = Router();

userRouter.post('/sign-up', validateSchemaMiddleware(userSchema), controller.register)

export default userRouter;  