import { Router } from "express";
import categoriesRouter from "./categoriesRouter.js";
import disciplineRouter from "./disciplinesRouter.js";
import oauthRouter from "./oauthRouter.js";
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
router.use(categoriesRouter);
router.use(oauthRouter);

export default router;  