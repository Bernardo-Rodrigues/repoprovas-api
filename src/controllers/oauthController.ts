import { Request, Response } from "express"
import oauthService from "../services/oauthService.js"

const service = new oauthService()

export async function login(req: Request, res: Response){
    const { code } = req.body

    const accessToken = await service.login(code)

    res.send(accessToken)
}