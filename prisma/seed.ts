import { client } from "../src/database"

export default async function seed(){
    const term = await client.term.upsert({
        where:{
            number: 1
        },
        update: {},
        create:{
            number: 1
        }
    })
    const teacher = await client.teacher.upsert({
        where:{
            name: 'test'
        },
        update: {},
        create:{
            name: 'test'
        }
    })
    const discipline = await client.discipline.upsert({
        where:{
            name: 'test'
        },
        update: {},
        create:{
            name: 'test',
            termId:term.id
        }
    })
    await client.teacherDiscipline.upsert({
        where:{
            id:1
        },
        update: {},
        create:{
            disciplineId: discipline.id,
            teacherId: teacher.id
        }
    })
}

