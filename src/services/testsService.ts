import * as testsRepository from "../repositories/testsRepository.js"

export default class testService{
    async getByDisciplines(disciplineId: number){
        const tests = await testsRepository.listByDiscipline(disciplineId)

        return tests
    }   

    async getByTeachers(teacherId: number){
        const tests = await testsRepository.listByTeacher(teacherId)

        return tests
    }   
}