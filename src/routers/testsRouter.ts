import { Router } from "express";
import * as controller from "../controllers/testsController.js"
import validateTokenMiddleware from "../middlewares/validateTokenMiddleware.js";

const testsRouter = Router();

testsRouter.get('/tests/disciplines/:id', validateTokenMiddleware, controller.getByDiscipline)
testsRouter.get('/tests/teachers/:id', validateTokenMiddleware, controller.getByTeacher)

export default testsRouter;  