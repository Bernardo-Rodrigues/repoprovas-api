import { Request, Response } from "express"
import testService from "../services/testsService.js"

const service = new testService()

export async function getByDiscipline(req: Request, res: Response){
    const tests = await service.getByDiscipline()

    res.send(tests)
}