import { client } from "../database.js";

export async function list(search:string){
    const teachers = await client.teacher.findMany({
        where:{
            name: {
                startsWith:  search,
                mode: 'insensitive'
            }
        }
    })

    return teachers;
}

// export async function listByDiscipline(disciplineName:string){
//     const teachers = await client.teacher.findMany({
//         select:{
//             name: true,
//             teachersDisciplines:{
//                 select:{
//                     discipline: {
//                         select:{
//                             name: true
//                         }
//                     }
//                 }
//             }
//         },
//     })

//     return teachers;
// }

export async function listByDiscipline(disciplineName:string){
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