import { Router } from "express";
import * as controller from "../controllers/teacherController.js"
import validateTokenMiddleware from "../middlewares/validateTokenMiddleware.js";

const teachersRouter = Router();

teachersRouter.get('/teachers', validateTokenMiddleware, controller.getAll)

export default teachersRouter;  