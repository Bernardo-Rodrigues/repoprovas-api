import { conflict, unauthorized } from "../errors/index.js";
import { UserInsertData } from "../repositories/userRepository.js";
import * as userRepository from "../repositories/userRepository.js"
import jwt from "jsonwebtoken"
import config from "../config.js"
import Cryptr from "cryptr"

const cryptr = new Cryptr(config.secretCryptr)

export default class userService{
    async register({email ,password}: UserInsertData){
        const user = await userRepository.findByEmail(email)
        const encryptedPassword = cryptr.encrypt(password)

        if(user) await this.#checkUserPasswordUpdate(user, encryptedPassword)
        else await userRepository.create({email, password: encryptedPassword})
    }
    
    async login({email ,password}: UserInsertData){
        const userId = await this.#validateUserLogin(email, password)

        const token = this.#createJWTToken(userId)
    
        return { token };
    }

    async #checkUserPasswordUpdate(user: any, password:string){
        if(!user.password) await userRepository.update({...user, password})
        else throw conflict("User already registered");
    }

    async #validateUserLogin(email: string, password:string){
        const user = await userRepository.findByEmail(email)

        if(!user || !user.password || cryptr.decrypt(user.password) !== password) throw unauthorized("User does not exist");

        return user.id
    }

    #createJWTToken(userId: number){
        const jwtConfiguration = { expiresIn: 60*60 };
        const jwtData = { userId };
        const token = jwt.sign(jwtData, config.secretJWT, jwtConfiguration);
        return token
    }
}