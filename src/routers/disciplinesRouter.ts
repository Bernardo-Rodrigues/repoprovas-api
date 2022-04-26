import { Router } from "express";
import * as controller from "../controllers/disciplineController.js"
import validateTokenMiddleware from "../middlewares/validateTokenMiddleware.js";

const disciplineRouter = Router();

disciplineRouter.get('/disciplines/terms/:id', validateTokenMiddleware, controller.getByTerm)

export default disciplineRouter;  