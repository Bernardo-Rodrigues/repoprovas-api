import * as testsRepository from "../repositories/testsRepository.js"

export default class testService{
    async getByDiscipline(){
        const tests = await testsRepository.listByDiscipline()

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
    async getByTeacher(){
        const tests = await testsRepository.listByTeacher()

        const formatedTests = tests.map( teacher => ({
            name: teacher.name,
            disciplines: teacher.teachersDisciplines.map( teacherDicipline => ({
                    name: teacherDicipline.discipline.name,
                    tests: teacherDicipline.tests.map( test => ({
                        name: test.name,
                        category: test.category.name
                    }))
            }))
        }))

        return formatedTests
    }   
}