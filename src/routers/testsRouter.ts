import { Router } from "express";
import * as controller from "../controllers/testsController.js"
import validateTokenMiddleware from "../middlewares/validateTokenMiddleware.js";

const testsRouter = Router();

testsRouter.get('/tests/disciplines', validateTokenMiddleware, controller.getByDiscipline)

export default testsRouter;  