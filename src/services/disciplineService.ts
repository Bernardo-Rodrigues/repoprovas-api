import * as disciplinesRepository from "../repositories/disciplinesRepository.js"
import * as termRepository from "../repositories/termRepository.js"
import { notFound } from "../errors/index.js"

export default class disciplineService{
    async getAll(){
        const disciplines = await disciplinesRepository.list()

        return disciplines
    }   

    async getByTerm(termId: number, search: string){
        await this.#validateTerm(termId)
        const disciplines = await disciplinesRepository.listByTerm(termId, search)

        return disciplines
    }   
    
    async #validateTerm(termId: number){
        const term = await termRepository.find(termId)
        if(!term) throw notFound("Esse período não existe")
    }
}