import { Request, Response } from "express"
import teacherService from "../services/teacherService.js"

const service = new teacherService()

export async function getAll(req: Request, res: Response){
    const search = req.query.search as string
    
    const teachers = await service.getAll(search)

    res.send(teachers)
}

export async function getByDiscipline(req: Request, res: Response){
    const disciplineName = req.params.name
    
    const teachers = await service.getByDiscipline(disciplineName)

    res.send(teachers)
}

