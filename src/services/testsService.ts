import * as testsRepository from "../repositories/testsRepository.js"
import * as categoriesRepository from "../repositories/categoriesRepository.js"
import * as teacherDisciplineRepository from "../repositories/teacherDisciplineRepository.js"
import * as teacherRepository from "../repositories/teacherRepository.js"
import * as disciplinesRepository from "../repositories/disciplinesRepository.js"
import { NotFound, BadRequest } from "../errors/index.js"

export default class testService{
    async getByDisciplines(disciplineId: number){
        const discipline = await disciplinesRepository.find(disciplineId)
        if(!discipline) throw new NotFound("Disciplina não encontrada")

        const tests = await testsRepository.listByDiscipline(disciplineId)

        return tests
    }   

    async getByTeachers(teacherId: number){
        const teacher = await teacherRepository.find(teacherId)
        if(!teacher) throw new NotFound("Professor não encontrado")

        const tests = await testsRepository.listByTeacher(teacherId)

        return tests
    }   
    
    async updateViews(testId: number){
        const test = await testsRepository.find(testId)
        if(!test) throw new NotFound("Prova não encontrada")
        
        await testsRepository.updateViews(testId)
    }

    async create(test: any){
        const category = await categoriesRepository.find(test.category)
        if(!category) throw new NotFound("Categoria não existe")
        const teacherDiscipline = await teacherDisciplineRepository.find(test.teacher, test.discipline)
        if(!teacherDiscipline) throw new BadRequest("Disciplina e professor não combinam")

        delete test.category
        delete test.teacher
        delete test.discipline

        await testsRepository.create({...test, categoryId: category.id, teacherDisciplineId: teacherDiscipline.id})
    }
}