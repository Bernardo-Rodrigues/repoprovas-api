import { Router } from "express";
import testsRouter from "./testsRouter.js";
import userRouter from "./userRouter.js";

const router = Router();

router.use(userRouter);
router.use(testsRouter);

export default router;  