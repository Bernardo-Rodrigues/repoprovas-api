import * as testsRepository from "../repositories/testsRepository.js"
import * as categoriesRepository from "../repositories/categoriesRepository.js"
import * as teacherDisciplineRepository from "../repositories/teacherDisciplineRepository.js"
import * as teacherRepository from "../repositories/teacherRepository.js"
import * as disciplinesRepository from "../repositories/disciplinesRepository.js"
import { notFound, badRequest } from "../errors/index.js"

export default class testService{
    async getByDisciplines(disciplineId: number){
        await this.#validateDiscipline(disciplineId)

        const tests = await testsRepository.listByDiscipline(disciplineId)

        return tests
    }   

    async getByTeachers(teacherId: number){
        await this.#validateTeacher(teacherId)

        const tests = await testsRepository.listByTeacher(teacherId)

        return tests
    }   
    
    async updateViews(testId: number){
        await this.#validateTest(testId)
        
        await testsRepository.updateViews(testId)
    }

    async create(test: any){
        const categoryId = await this.#validateCategory(test.category)
        const teacherDisciplineId = await this.#validateTeacherDiscipline(test.teacher, test.discipline)

        delete test.category
        delete test.teacher
        delete test.discipline

        await testsRepository.create({...test, categoryId, teacherDisciplineId})
    }

    async #validateDiscipline(disciplineId: number){
        const discipline = await disciplinesRepository.findById(disciplineId)
        if(!discipline) throw notFound("Essa disciplina não existe")
    }

    async #validateTeacher(teacherId: number){
        const teacher = await teacherRepository.find(teacherId)
        if(!teacher) throw notFound("Professor não encontrado")
    }

    async #validateTest(testId: number){
        const test = await testsRepository.find(testId)
        if(!test) throw notFound("Prova não encontrada")
    }

    async #validateCategory(categoryName: string){
        const category = await categoriesRepository.find(categoryName)
        if(!category) throw notFound("Categoria não existe")
        return category.id
    }

    async #validateTeacherDiscipline(teacherName: string, disciplineName: string){
        const teacherDiscipline = await teacherDisciplineRepository.find(teacherName, disciplineName)
        if(!teacherDiscipline) throw badRequest("Disciplina e professor não combinam")
        return teacherDiscipline.id
    }
}