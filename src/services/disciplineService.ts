import * as disciplinesRepository from "../repositories/disciplinesRepository.js"

export default class disciplineService{
    async getByTerm(termId: number){
        const disciplines = await disciplinesRepository.listByTerm(termId)

        return disciplines
    }   
}