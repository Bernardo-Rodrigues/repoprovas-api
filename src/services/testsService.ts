import * as testsRepository from "../repositories/testsRepository.js"

export default class testService{
    async getByDiscipline(){
        const tests = await testsRepository.list()

        const formatedTests = tests.map( term => ({
            number: term.number,
            disciplines: term.disciplines.map( discipline => ({
                name: discipline.name,
                teachers: discipline.teachersDisciplines.map( teacherDicipline => ({
                    name: teacherDicipline.teacher.name,
                    tests: teacherDicipline.tests.map( test => ({
                        name: test.name,
                        category: test.category.name
                    }))
                }))
            }))
        }))

        return formatedTests
    }   
}