import * as userRepository from "../repositories/userRepository.js"
import axios from "axios"
import config from "../config.js"
import jwt from "jsonwebtoken"

export default class oauthService{
    async login(code: string){
        const email = await getUserEmail(code)

        const user = await userRepository.findByEmail(email)
        if(!user) await userRepository.create({email})

        const jwtConfiguration = { expiresIn: 60*60 };
        const jwtData = { userId: user.id };
        const token = jwt.sign(jwtData, config.secretJWT, jwtConfiguration);
    
        return { token };
    }
    
}

async function getUserEmail(code: string){
    const accessToken = await getToken(code)
    const  { data }  = await axios.get(`https://api.github.com/user`, {headers:{ Authorization: `token ${accessToken}`}})
    const userEmail = data['email']
    return userEmail
}

async function getToken(code: string){
    const  { data }  = await axios.post(`https://github.com/login/oauth/access_token?client_id=${config.clientId}&client_secret=${config.clientSecret}&code=${code}`, {}, {headers:{Accept: 'application/json'}})
    const accessToken = data['access_token']
    return accessToken
}