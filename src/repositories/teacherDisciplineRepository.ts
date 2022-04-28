import { client } from "../database.js";

export async function find(teacherName: string, disciplineName: string){
    const teacherDiscipline = await client.teacherDiscipline.findFirst({
        where:{
            teacher:{
                name: teacherName
            },
            discipline:{
                name: disciplineName
            }
        }
    })

    return teacherDiscipline;
}