import * as disciplinesRepository from "../repositories/disciplinesRepository.js"
import { notFound } from "../errors/index.js"

export default class disciplineService{
    async getAll(){
        const disciplines = await disciplinesRepository.list()

        return disciplines
    }   
    async getByTerm(termId: number, search: string){
        const disciplines = await disciplinesRepository.listByTerm(termId, search)
        if(!disciplines.length) throw notFound("Esse período não existe")

        return disciplines
    }   
}