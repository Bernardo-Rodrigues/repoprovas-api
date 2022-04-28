import { Router } from "express";
import * as controller from "../controllers/categoriesController.js"
import validateTokenMiddleware from "../middlewares/validateTokenMiddleware.js";

const categoriesRouter = Router();

categoriesRouter.get('/categories', validateTokenMiddleware, controller.getAll)

export default categoriesRouter;  