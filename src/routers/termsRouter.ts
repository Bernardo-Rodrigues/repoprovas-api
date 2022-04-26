import { Router } from "express";
import * as controller from "../controllers/termController.js"
import validateTokenMiddleware from "../middlewares/validateTokenMiddleware.js";

const termsRouter = Router();

termsRouter.get('/terms', validateTokenMiddleware, controller.getAll)

export default termsRouter;  