import * as termsRepository from "../repositories/termRepository.js"

export default class termService{
    async getAll(){
        const terms = await termsRepository.list()

        return terms
    }   
}