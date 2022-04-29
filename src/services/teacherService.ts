import * as teacherRepository from "../repositories/teacherRepository.js"
import * as disciplinesRepository from "../repositories/disciplinesRepository.js"
import NotFound from "../errors/NotFoundError.js"

export default class teacherService{
    async getAll(search: string){
        const teachers = await teacherRepository.list(search)

        return teachers
    }   

    async getByDiscipline(disciplineName: string){
        const teachers = await disciplinesRepository.listTeachersByDiscipline(disciplineName)
        if(!teachers.length) throw new NotFound("Essa disciplina não existe")

        return teachers
    }   
}
