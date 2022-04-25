import { Unauthorized } from "../errors/index.js";
import * as sessionRepository from "../repositories/sessionRepository.js";

export default class sesionService{
    async findByToken(token: string){
        const session = await sessionRepository.findByToken(token);
        if(!session) throw new Unauthorized("Token is invalid");

        return session
    }

    async remove(sessionId: number){
        await sessionRepository.remove(sessionId);
    }
}