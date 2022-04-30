import * as testsRepository from "../repositories/testsRepository.js"
import * as categoriesRepository from "../repositories/categoriesRepository.js"
import * as teacherDisciplineRepository from "../repositories/teacherDisciplineRepository.js"
import * as teacherRepository from "../repositories/teacherRepository.js"
import * as disciplinesRepository from "../repositories/disciplinesRepository.js"
import { notFound, badRequest } from "../errors/index.js"

export default class testService{
    async getByDisciplines(disciplineId: number){
        const discipline = await disciplinesRepository.find(disciplineId)
        if(!discipline) throw notFound("Disciplina não encontrada")

        const tests = await testsRepository.listByDiscipline(disciplineId)

        return tests
    }   

    async getByTeachers(teacherId: number){
        const teacher = await teacherRepository.find(teacherId)
        if(!teacher) throw notFound("Professor não encontrado")

        const tests = await testsRepository.listByTeacher(teacherId)

        return tests
    }   
    
    async updateViews(testId: number){
        const test = await testsRepository.find(testId)
        if(!test) throw notFound("Prova não encontrada")
        
        await testsRepository.updateViews(testId)
    }

    async create(test: any){
        const category = await categoriesRepository.find(test.category)
        if(!category) throw notFound("Categoria não existe")
        const teacherDiscipline = await teacherDisciplineRepository.find(test.teacher, test.discipline)
        if(!teacherDiscipline) throw badRequest("Disciplina e professor não combinam")

        delete test.category
        delete test.teacher
        delete test.discipline

        await testsRepository.create({...test, categoryId: category.id, teacherDisciplineId: teacherDiscipline.id})
    }
}