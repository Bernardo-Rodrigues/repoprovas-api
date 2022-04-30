import * as teacherRepository from "../repositories/teacherRepository.js"
import * as disciplinesRepository from "../repositories/disciplinesRepository.js"
import { notFound } from "../errors/index.js"

export default class teacherService{
    async getAll(search: string){
        const teachers = await teacherRepository.list(search)

        return teachers
    }   

    async getByDiscipline(disciplineName: string){
        await this.#validateDiscipline(disciplineName)
        const teachers = await disciplinesRepository.listTeachersByDiscipline(disciplineName)

        return teachers
    }   

    async #validateDiscipline(disciplineName: string){
        const discipline = await disciplinesRepository.findByName(disciplineName)
        if(!discipline) throw notFound("Essa disciplina não existe")
    }
}
