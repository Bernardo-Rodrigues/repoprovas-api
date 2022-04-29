import NotFound from "../errors/NotFoundError.js"
import * as disciplinesRepository from "../repositories/disciplinesRepository.js"
import disciplineRouter from "../routers/disciplinesRouter.js"

export default class disciplineService{
    async getAll(){
        const disciplines = await disciplinesRepository.list()

        return disciplines
    }   
    async getByTerm(termId: number, search: string){
        const disciplines = await disciplinesRepository.listByTerm(termId, search)
        if(!disciplines.length) throw new NotFound("Esse período não existe")

        return disciplines
    }   
}