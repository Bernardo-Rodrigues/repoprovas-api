import { Request, Response } from "express"
import teacherService from "../services/teacherService.js"

const service = new teacherService()

export async function getAll(req: Request, res: Response){
    const teachers = await service.getAll()

    res.send(teachers)
}
