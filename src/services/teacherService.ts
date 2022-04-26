import * as teacherRepository from "../repositories/teacherRepository.js"

export default class teacherService{
    async getAll(){
        const teachers = await teacherRepository.list()

        return teachers
    }   
}