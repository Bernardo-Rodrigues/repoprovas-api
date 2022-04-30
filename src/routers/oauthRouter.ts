import { Router } from "express";
import * as controller from "../controllers/oauthController.js"

const oauthRouter = Router();

oauthRouter.post('/oauth/github', controller.login)

export default oauthRouter;  