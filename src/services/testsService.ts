import * as testsRepository from "../repositories/testsRepository.js"
import * as termsRepository from "../repositories/termRepository.js"
import * as categoryRepository from "../repositories/categoryRepository.js"
import * as teacherRepository from "../repositories/teacherRepository.js"

export default class testService{
    async getByDisciplines(){
        const tests = await testsRepository.list()
        const terms = await termsRepository.list()
        const categoriesHash = {}
        
        tests.forEach( test => {
            if(!categoriesHash[test.category.name]) categoriesHash[test.category.name] = [{name:test.name, teacher: test.teacherDiscipline.teacher.name, discipline: test.teacherDiscipline.discipline.name}]
            else categoriesHash[test.category.name].push({name:test.name, teacher: test.teacherDiscipline.teacher.name, discipline: test.teacherDiscipline.discipline.name})
        }) 
        
        const fomatedTerms = terms.map( term => ({
            number: term.number,
            disciplines: term.disciplines.map( discipline => ({
                name: discipline.name,
                categories: Object.entries(categoriesHash).map( (category:any) => {
                    const tests = category[1].filter( (test:any )=> test.discipline === discipline.name)
                    if(tests.length === 0) return
                    return {
                        name: category[0],
                        tests
                    }
                }).filter( category => category !== undefined)
            }))
        }))

        return fomatedTerms
    }   

    async getByTeachers(){
        const teachers = await teacherRepository.list()
        const categories = await categoryRepository.list()
        
        const formatedCategories = categories.map( category => ({
            name: category.name,
            tests: category.tests.map( test => ({
                name: test.name,
                discipline: test.teacherDiscipline.discipline.name,
                teacher: test.teacherDiscipline.teacher.name
            }))
        }))
        
        const fomatedTeachers = teachers.map( teacher => ({
            name: teacher.name,
            categories: formatedCategories.map( category => ({
                name: category.name,
                tests: category.tests.filter( test => test.teacher === teacher.name)
            })).filter( category => category.tests.length > 0)
        }))

        return fomatedTeachers
    }   
}