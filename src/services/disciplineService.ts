import * as disciplinesRepository from "../repositories/disciplinesRepository.js"

export default class disciplineService{
    async getAll(){
        const disciplines = await disciplinesRepository.list()

        return disciplines
    }   
    async getByTerm(termId: number, search: string){
        const disciplines = await disciplinesRepository.listByTerm(termId, search)

        return disciplines
    }   
}