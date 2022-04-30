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
    const discipline = await client.discipline.findUnique({
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

    return discipline;
}

export async function findById(id: number){
    const disciplne = await client.discipline.findUnique({
        where:{
            id
        }
    })

    return disciplne;
}

export async function findByName(name: string){
    const disciplne = await client.discipline.findUnique({
        where:{
            name
        }
    })

    return disciplne;
}