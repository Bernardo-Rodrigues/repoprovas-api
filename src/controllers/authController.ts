import { Request, Response } from "express"
import { UserInsertData } from "../repositories/userRepository.js"
import authService from "../services/authService.js"

const service = new authService()

export async function login(req: Request, res: Response){
    const userData: UserInsertData = req.body

    const token = await service.login(userData)

    res.status(200).send(token)
}