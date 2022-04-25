import { Request, Response } from "express"
import { UserInsertData } from "../repositories/userRepository.js"
import userService from "../services/userService.js"

const service = new userService()

export async function register(req: Request, res: Response){
    const userData: UserInsertData = req.body

    await service.register(userData)

    res.sendStatus(201)
}

export async function login(req: Request, res: Response){
    const userData: UserInsertData = req.body

    const token = await service.login(userData)

    res.send(token)
}