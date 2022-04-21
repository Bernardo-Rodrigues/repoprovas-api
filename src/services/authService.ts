import { Unauthorized } from "../errors/index.js";
import { UserInsertData } from "../repositories/userRepository.js";
import * as userRepository from "../repositories/userRepository.js";
import * as sessionRepository from "../repositories/sessionRepository.js";
import jwt from "jsonwebtoken"
import config from "../config.js"
import Cryptr from "cryptr"

const cryptr = new Cryptr(config.secretCryptr)

export default class authService{
    async login({email ,password}: UserInsertData){
        const user = await userRepository.findByEmail(email)

        if(!user || cryptr.decrypt(user.password) !== password) throw new Unauthorized("User does not exist");
        const session = await sessionRepository.findByUserId(user.id);
        
        if(session){
            try {
                jwt.verify(session.token, config.secretJWT);
                return { token: session.token };
            } catch (error) {
                await sessionRepository.remove(session.id);
            }
        }

        const jwtConfiguration = { expiresIn: 60*60 };
        const jwtData = { userId: user.id };
        const token = jwt.sign(jwtData, config.secretJWT, jwtConfiguration);

        await sessionRepository.create({token, userId:user.id});
    
        return { token };

    }
}