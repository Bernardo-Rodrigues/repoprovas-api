import { Request, Response } from "express"
import testService from "../services/testsService.js"

const service = new testService()

export async function getByDiscipline(req: Request, res: Response){
    const tests = await service.getByDisciplines()

    res.send(tests)
}

export async function getByTeacher(req: Request, res: Response){
    const tests = await service.getByTeachers()

    res.send(tests)
}