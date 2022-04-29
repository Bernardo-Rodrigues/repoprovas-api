import { client } from "../database.js";

export async function list(){
    const disciplines = await client.discipline.findMany()

    return disciplines;
}

export async function listByTerm(termId: number, search:string){
    const disciplines = await client.discipline.findMany({
        where:{
            termId,
            name: {
                startsWith:  search,
                mode: 'insensitive'
            }
        }
    })

    return disciplines;
}

export async function listTeachersByDiscipline(disciplineName:string){
    const teachers = await client.discipline.findMany({
        select:{
            teachersDisciplines:{
                select:{
                    teacher:{
                        select:{
                            name: true
                        }
                    }
                }
            }
        },
        where:{
            name: disciplineName
        }
    })

    return teachers;
}

export async function find(disciplineId: any){
    const test = await client.discipline.findUnique({
        where:{
            id: disciplineId
        }
    })

    return test;
}