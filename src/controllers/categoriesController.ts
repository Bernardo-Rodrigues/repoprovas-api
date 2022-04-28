import { Request, Response } from "express"
import categoriesService from "../services/categoriesService.js"

const service = new categoriesService()

export async function getAll(req: Request, res: Response){
    const categories = await service.getAll()

    res.send(categories)
}
