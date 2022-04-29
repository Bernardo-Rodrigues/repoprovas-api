import { Category, Discipline, Teacher, TeacherDiscipline, Term, Test } from ".prisma/client"
import { client } from "../src/database"
import { faker } from "@faker-js/faker"

export default async function seed(){
    const term: Term = await client.term.upsert({
        where:{
            number: faker.datatype.number()
        },
        update: {},
        create:{
            number: faker.datatype.number()
        }
    })
    const teacher: Teacher = await client.teacher.upsert({
        where:{
            name: faker.lorem.word()
        },
        update: {},
        create:{
            name: faker.lorem.word()
        }
    })
    const discipline: Discipline = await client.discipline.upsert({
        where:{
            name: faker.lorem.word()
        },
        update: {},
        create:{
            name: faker.lorem.word(),
            termId:term.id
        }
    })
    const teacherDiscipline: TeacherDiscipline = await client.teacherDiscipline.upsert({
        where:{
            id:1
        },
        update: {},
        create:{
            disciplineId: discipline.id,
            teacherId: teacher.id
        }
    })
    const category: Category = await client.category.upsert({
        where:{
            name: faker.lorem.word()
        },
        update: {},
        create:{
            name: faker.lorem.word()
        }
    })
    const test: Test = await client.test.upsert({
        where:{
            id: faker.datatype.number()
        },
        update: {},
        create:{
            name: faker.lorem.word(),
            pdfUrl: faker.internet.url(),
            categoryId: category.id,
            teacherDisciplineId: teacherDiscipline.id
        }
    })

    return {
        term,
        teacher,
        discipline,
        teacherDiscipline,
        category,
        test
    }
}

