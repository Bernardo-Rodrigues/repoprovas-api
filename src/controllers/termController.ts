import { Request, Response } from "express"
import termsService from "../services/termsService.js"

const service = new termsService()

export async function getAll(req: Request, res: Response){
    const terms = await service.getAll()

    res.send(terms)
}
