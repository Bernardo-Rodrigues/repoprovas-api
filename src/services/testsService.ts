import * as testsRepository from "../repositories/testsRepository.js"
import * as categoriesRepository from "../repositories/categoriesRepository.js"
import * as teacherDisciplineRepository from "../repositories/teacherDisciplineRepository.js"

export default class testService{
    async getByDisciplines(disciplineId: number){
        const tests = await testsRepository.listByDiscipline(disciplineId)

        return tests
    }   

    async getByTeachers(teacherId: number){
        const tests = await testsRepository.listByTeacher(teacherId)

        return tests
    }   
    
    async updateViews(testId: number){
        await testsRepository.updateViews(testId)
    }

    async create(test: any){
        const categoryId = (await categoriesRepository.find(test.category)).id
        const teacherDisciplineId = (await teacherDisciplineRepository.find(test.teacher, test.discipline)).id

        delete test.category
        delete test.teacher
        delete test.discipline

        await testsRepository.create({...test, categoryId, teacherDisciplineId})
    }
}