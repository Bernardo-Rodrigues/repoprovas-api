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

export async function updateViews(req: Request, res: Response){
    const testId = parseInt(req.params.id)

    await service.updateViews(testId)

    res.sendStatus(200)
}

export async function create(req: Request, res: Response){
    const pdf = req.file
    const test = req.body

    await service.create({...test, pdf})

    res.sendStatus(201)
}