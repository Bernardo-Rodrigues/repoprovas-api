import { Router } from "express";
import disciplineRouter from "./disciplinesRouter.js";
import teachersRouter from "./teachersRouter.js";
import termsRouter from "./termsRouter.js";
import testsRouter from "./testsRouter.js";
import userRouter from "./userRouter.js";

const router = Router();

router.use(userRouter);
router.use(testsRouter);
router.use(disciplineRouter);
router.use(teachersRouter);
router.use(termsRouter);

export default router;  