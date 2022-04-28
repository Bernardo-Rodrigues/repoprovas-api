import { Request, Response } from "express"
import DisciplineService from "../services/disciplineService.js"

const service = new DisciplineService()

export async function getAll(req: Request, res: Response){
    const disciplines = await service.getAll()

    res.send(disciplines)
}

export async function getByTerm(req: Request, res: Response){
    const diciplineId = parseInt(req.params.id)
    const search = req.query.search as string

    const disciplines = await service.getByTerm(diciplineId, search)

    res.send(disciplines)
}