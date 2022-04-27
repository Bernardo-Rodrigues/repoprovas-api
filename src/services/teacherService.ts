import * as teacherRepository from "../repositories/teacherRepository.js"

export default class teacherService{
    async getAll(search: string){
        const teachers = await teacherRepository.list(search)

        return teachers
    }   
}