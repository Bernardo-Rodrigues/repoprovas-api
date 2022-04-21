import { Conflict } from "../errors/index.js";
import { UserInsertData } from "../repositories/userRepository.js";
import * as userRepository from "../repositories/userRepository.js"
import config from "../config.js"
import Cryptr from "cryptr"

const cryptr = new Cryptr(config.secretCryptr)

export default class userService{
    async register({email ,password}: UserInsertData){
        const user = await userRepository.findByEmail(email)
        if(user) throw new Conflict("User already registered");

        const encryptedPassword = cryptr.encrypt(password)

        await userRepository.create({email, password: encryptedPassword})
    }
}