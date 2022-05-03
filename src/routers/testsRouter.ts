import { Router } from "express";
import * as controller from "../controllers/testsController.js"
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import validateTokenMiddleware from "../middlewares/validateTokenMiddleware.js";
import testSchema from "../schemas/testSchema.js";
import multer from "multer";

const storage = multer.memoryStorage()
const upload = multer({ storage })

const testsRouter = Router();

testsRouter.get('/tests/disciplines/:id', validateTokenMiddleware, controller.getByDiscipline)
testsRouter.get('/tests/teachers/:id', validateTokenMiddleware, controller.getByTeacher)
testsRouter.patch('/tests/:id/view', validateTokenMiddleware, controller.updateViews)
testsRouter.post('/tests', validateTokenMiddleware, upload.single("pdf"), controller.create)

export default testsRouter;  