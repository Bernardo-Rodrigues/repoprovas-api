import { Request, Response } from "express"
import testService from "../services/testsService.js"

const service = new testService()

export async function getByDiscipline(req: Request, res: Response){
    const disciplineId = parseInt(req.params.id)

    const tests = await service.getByDisciplines(disciplineId)

    res.send(tests)
}

export async function getByTeacher(req: Request, res: Response){
    const teacherId = parseInt(req.params.id)

    const tests = await service.getByTeachers(teacherId)

    res.send(tests)
}