import { Router } from "express";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import userSchema from "../schemas/userSchema.js";
import * as controller from "../controllers/authController.js"

const authRouter = Router();

authRouter.post('/sign-in', validateSchemaMiddleware(userSchema), controller.login)

export default authRouter;  