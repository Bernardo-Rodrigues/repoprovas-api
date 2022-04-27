import * as disciplinesRepository from "../repositories/disciplinesRepository.js"

export default class disciplineService{
    async getByTerm(termId: number, search: string){
        const disciplines = await disciplinesRepository.listByTerm(termId, search)

        return disciplines
    }   
}