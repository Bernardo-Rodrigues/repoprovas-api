import { Conflict, Unauthorized } from "../errors/index.js";
import { UserInsertData } from "../repositories/userRepository.js";
import * as userRepository from "../repositories/userRepository.js"
import jwt from "jsonwebtoken"
import config from "../config.js"
import Cryptr from "cryptr"

const cryptr = new Cryptr(config.secretCryptr)

export default class userService{
    async register({email ,password}: UserInsertData){
        const encryptedPassword = cryptr.encrypt(password)

        const user = await userRepository.findByEmail(email)
        if(user) {
            if(!user.password) await userRepository.update({...user, password: encryptedPassword})
            else throw new Conflict("User already registered");
        }else{
            await userRepository.create({email, password: encryptedPassword})
        }

    }
    
    async login({email ,password}: UserInsertData){
        const user = await userRepository.findByEmail(email)

        if(!user || !user.password || cryptr.decrypt(user.password) !== password) throw new Unauthorized("User does not exist");

        const jwtConfiguration = { expiresIn: 60*60 };
        const jwtData = { userId: user.id };
        const token = jwt.sign(jwtData, config.secretJWT, jwtConfiguration);
    
        return { token };
    }
}